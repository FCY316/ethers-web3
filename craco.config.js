const path = require("path");
const tailwindPostcss = require("@tailwindcss/postcss");

/**
 * CRA 5 内部把 tailwindcss@3 当作 PostCSS 插件直接加载，但该入口在 Tailwind v4 已移除。
 * CRACO 在创建完 CRA 的 webpack 配置后执行此函数：
 * - 有旧配置文件时，CRA 会注入旧插件，因此直接替换；
 * - 纯 v4 无配置文件时，CRA 不会注入任何 Tailwind 插件，因此主动插入。
 * 两种场景都保留 CRA 原有的 CSS loader、source map 和其他 PostCSS 行为。
 *
 * @param {Array<Record<string, any>>} rules webpack 的规则树（其中可能包含 oneOf 嵌套规则）
 * @returns {boolean} 是否成功配置了至少一个 Tailwind v4 PostCSS 插件
 */
const configureTailwindPostcssPlugin = (rules) => {
  let configured = false;

  rules.forEach((rule) => {
    // CRA 将大部分样式规则放在 oneOf 中，递归处理才能同时覆盖普通 CSS 与 CSS Modules。
    if (Array.isArray(rule.oneOf)) {
      configured = configureTailwindPostcssPlugin(rule.oneOf) || configured;
    }

    const loaders = Array.isArray(rule.use) ? rule.use : [rule.use];
    loaders.forEach((loader) => {
      if (
        !loader ||
        typeof loader !== "object" ||
        !loader.loader?.includes("postcss-loader")
      ) {
        return;
      }

      const plugins = loader.options?.postcssOptions?.plugins;
      if (!Array.isArray(plugins)) return;

      const tailwindIndex = plugins.findIndex((plugin) => plugin === "tailwindcss");
      if (tailwindIndex === -1) {
        // 没有 tailwind.config.js 时，CRA 不会添加旧插件；在最前面插入 v4 插件以处理 @import "tailwindcss"。
        plugins.unshift(tailwindPostcss());
      } else {
        // 有旧配置时，v4 的 PostCSS 插件已迁移到 @tailwindcss/postcss；替换 CRA 旧入口。
        plugins[tailwindIndex] = tailwindPostcss();
      }

      configured = true;
    });
  });

  return configured;
};

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      const tailwindPluginConfigured = configureTailwindPostcssPlugin(
        webpackConfig.module.rules
      );

      // 若 CRA 的内部配置结构变化，立刻让构建失败，避免项目遗漏 Tailwind v4 样式。
      if (!tailwindPluginConfigured) {
        throw new Error("无法在 CRA 配置中设置 Tailwind v4 的 PostCSS 插件");
      }

      // 找到 source-map-loader 的规则，并且加上 exclude
      webpackConfig.module.rules.forEach((rule) => {
        if (
          rule.enforce === "pre" &&
          rule.use &&
          rule.use.includes("source-map-loader")
        ) {
          rule.exclude = [
            ...(rule.exclude || []),
            /node_modules\/@solana\/buffer-layout/,
            /node_modules\/superstruct/,
          ];
        }
      });

      return webpackConfig;
    },
  },
};

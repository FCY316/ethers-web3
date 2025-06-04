const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
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

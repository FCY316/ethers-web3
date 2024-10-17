const path = require("path");

module.exports = {
  // 此处省略 webpack 配置
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },

};

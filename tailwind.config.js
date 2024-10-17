/** @type {import('tailwindcss').Config} */
module.exports = {
  // 样式优先级最高
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // 添加媒体查询，有默认的，也可以自己去添加
    screens: {
      tablet: "640px", // => @media (min-width: 640px) ，浏览器窗口或设备屏幕宽度大于或等于640px时，其中包含的CSS样式将会生效。
    },
    extend: {
      colors: {
        primary: {
          50: "#f5f5f5",
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#828282",
          600: "#424242",
        },
      },
    },
  },
  plugins: [],
};

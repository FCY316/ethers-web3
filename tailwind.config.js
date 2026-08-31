/** @type {import('tailwindcss').Config} */
const scrollbar = require("tailwind-scrollbar");
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "PingFang SC",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Microsoft YaHei",
          "sans-serif",
        ],
        pingfang: ["PingFang SC", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      width: {
        7.5: "1.875rem", // 30px
        17.75: "4.4375rem", // 71px
        35: "8.75rem", // 140px
        83.75: "20.9375rem", // 335px
        27.75: "6.9375rem", // 111px
        54.75: "13.6875rem", // 219px
        29.75: "7.4375rem", // 119px
        25.25: "6.3125rem", // 101px
        28.75: "7.1875rem", // 115px
        45.75: "11.4375rem", // 183px
        55.5: "13.875rem", // 222px
      },
      minWidth: {
        73.75: "18.4375rem", // 295px
      },
      height: {
        9.5: "2.375rem", // 38px
        38.25: "9.5625rem", // 153px
        10.5: "2.625rem", // 42px
        6.5: "1.625rem", // 26px
        7.5: "1.875rem", // 30px
      },
      padding: {
        4.5: "1.125rem", // 18px
        4.25: "1.0625rem", // 17px
        7.5: "1.875rem", // 30px
        15: "3.75rem", // 60px
        8.75: "2.1875rem", // 35px
        3.75: "0.9375rem", // 15px
        22.5: "5.625rem", // 90px
      },
      margin: {
        7.5: "1.875rem", // 30px
        5.5: "1.375rem", // 22px
        4.5: "1.125rem", // 18px
        1.25: "0.3125rem", // 5px
        13: "3.25rem", // 52px
        3.25: "0.8125rem", // 13px
        8.5: "2.125rem", // 34px
        3.75: "0.9375rem", // 15px
        11.75: "2.9375rem", // 47px
      },
      colors: {
        footBorder: "rgba(255, 255, 255, 0.2)",
        d5: "#D5CBDB",
        ad: "#ADA4AE",
        fa: "#FA7CF3",
        e3: "#E3E2E3",
        "3a": "#3A2E3B",
        "3e": "#3E2740",
        "3c": "#3C034A",
        49: "#490255",
        a4: "#A481AA",
        d1: "#D1BCD2",
        a8: "#A8ACA7",
        adad: "#ADADAD",
        53: "#535353",
        38: "#38243A",
        "white-80": "rgba(255, 255, 255, 0.8)",
        "9e": "#9E9E9E",
        21: "#210220",
        ac: "#ACA7AC",
        "4d": "#4D384D",
        cf: "#CFCAD0",
        "3f": "#3F054C",
        bd: "#BDBEBD",
        "5c": "#5C575D  ",
        c7: "rgba(199, 0, 255, 0.15)",
        1901: " rgba(199, 0, 255, 0.1)",
        66: "#664864",
        40: "#404040",
        d5a: "#D5A1E4",
        rgb85: "rgba(33,2,32,0.70)",
      },
      fontSize: {
        "10px": "0.625rem", // 10px
        "13px": "0.8125rem", // 13px
        "15px": "0.9375rem", // 15px
        "18px": "1.125rem", // 18px
        "20px": "1.25rem", // 20px
        "22px": "1.375rem", // 22px
      },
      borderRadius: {
        "10px": "0.625rem", // 10px
        "15px": "0.9375rem", // 15px
        "20px": "1.25rem", // 20px
        "5px": "0.3125rem", // 5px
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        float3d: "float3d 8s ease-in-out infinite",
        rotateFloat: "rotateFloat 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotateX(0deg)",
          },
          "50%": {
            transform: "translateY(-8px) rotateX(2deg)",
          },
        },
        float3d: {
          "0%, 100%": {
            transform: "translateY(0) translateZ(0) rotateX(0deg)",
          },
          "50%": {
            transform: "translateY(-12px) translateZ(20px) rotateX(3deg)",
          },
        },
        rotateFloat: {
          "0%, 100%": {
            transform: "translateY(0) rotateY(0deg)",
          },
          "25%": {
            transform: "translateY(-5px) rotateY(5deg)",
          },
          "75%": {
            transform: "translateY(-5px) rotateY(-5deg)",
          },
        },
      },
    },
  },
  plugins: [scrollbar],
};

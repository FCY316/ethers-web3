/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "00b": "#00B03B",
      },
      backgroundColor: {
        f1: "#F1F1F1",
        dd: "#DDE8E1",
        f5: "#F5F7F6",
        ee: "#EEEEEE",
        e2: "#E2F0E7",
        f7: "#F7FFFA",
        ffb: "#FFBABA",
        "00b": "#00BF40",
        b7e: "#B7EAC8",
      },
      textColor: {
        mainBlack: "#02230D",
        86: "#86909C",
        ab: "#A8CBB4",
        a6: "#A6A6A6",
        66: "#666666",
        a8: "#A8A8A8",
        "1d": "#1D2129",
        aa: "#AAAAAA",
        "4e": "#4E5969",
        "3d": "#3d3d3d",
        "00b": "#00BF40",
      },
      fontSize: {
        3.25: "0.8125rem", // 13px
        6.5: "1.625rem", // 26px
      },
      width: {
        costPopoverW: "calc(100vw - 3.375rem)", // 54px
        12.5: "3.125rem", // 50px
        4.5: "1.125rem", // 18px
        72: "18rem", // 288px
        45: "11.25rem", // 180px
        14.5: "3.625rem", // 58px
        9.5: "2.375rem", // 38px
        7.5: "1.875rem", // 30px
        75.5: "18.875rem", // 302px
        85.75: "21.4375rem", // 343px
        6.25: "1.5625rem", // 25px
        95: "23.75rem", // 380px
        130.5: "32.625rem", // 522px
      },
      height: {
        crawerH: "calc(100% - 3rem)",
        6.5: "1.625rem", // 26px
        7.5: "1.875rem", // 30px
        22: "5.5rem", // 88px
        12.5: "3.125rem", // 50px
      },
      borderColor: {
        d3: "#D3E1D8",
        e2: "#E2E5EB",
        f1: "#F1F1F1",
        ee: "#EEEEEE",
        ffb: "#FFBABA",
      },
      margin: {
        21.75: "5.4375rem", // 87px
        1.25: "0.3125rem", // 5px
        2.25: "0.5625rem", // 9px
        3.75: "0.9375rem", // 15px
        6.5: "1.625rem", // 26px
        1.75: "0.4375rem", // 7px
        7.5: "1.875rem", // 30px
        5.5: "1.375rem", // 22px
      },
      padding: {
        7.75: "1.9375rem", // 31px
        4.75: "1.1875rem", // 19px
        4.25: "1.0625rem", // 17px
        6.25: "1.5625rem", // 25px
        1.25: "0.3125rem", // 5px
        3.75: "0.9375rem", // 15px
        5.5: "1.375rem", // 22px
      },
      borderRadius: {
        10: "2.5rem", // 40px
        1.25: "0.3125rem", // 5px
        5: "1.25rem", // 20px
      },
    },
  },
  plugins: [scrollbar],
};

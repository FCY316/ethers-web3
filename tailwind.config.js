/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbar],
};

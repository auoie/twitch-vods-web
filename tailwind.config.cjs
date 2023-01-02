/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        zinc: {
          950: "#0e0e11",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

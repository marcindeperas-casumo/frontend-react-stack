const colors = require("./config/tailwind/colors");
const spacing = require("./config/tailwind/spacing");
const screens = require("./config/tailwind/screens");
const zIndex = require("./config/tailwind/zIndex");

module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    "./src/models/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    spacing,
    screens,
    zIndex,
    extend: {
      backgroundColor: ["active"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

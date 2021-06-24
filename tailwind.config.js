const lineClamp = require("@tailwindcss/line-clamp");
const colors = require("./config/tailwind/colors");
const spacing = require("./config/tailwind/spacing");
const screens = require("./config/tailwind/screens");
const zIndex = require("./config/tailwind/zIndex");
const fontSize = require("./config/tailwind/fontSize");

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/features/**/*.{js,jsx,ts,tsx}",
      "./src/layouts/**/*.{js,jsx,ts,tsx}",
      "./src/models/**/*.{js,jsx,ts,tsx}",
      "./src/pages/**/*.{js,jsx,ts,tsx}",
    ],
    whitelist: ["grid", "tablet:grid", "phablet:grid", "desktop:grid"], // fix attempt at purged classes?
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    spacing,
    screens,
    zIndex,
    fontSize,
    extend: {
      backgroundColor: ["active"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [lineClamp],
};

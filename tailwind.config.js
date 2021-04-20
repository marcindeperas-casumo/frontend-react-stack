module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Circular Pro"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans - serif",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

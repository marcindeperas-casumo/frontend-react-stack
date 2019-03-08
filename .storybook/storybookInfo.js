import { color } from "./casumoTheme";

const info = options => ({
  info: {
    disable: navigator.userAgent.match(/Chromatic/),
    ...options,
    styles: {
      button: {
        base: {
          background: color.secondary,
        },
      },
    },
  },
});

export default info;

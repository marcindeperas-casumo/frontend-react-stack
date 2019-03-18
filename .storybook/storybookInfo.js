import { color } from "./casumoTheme";

const storybookInfo = options => ({
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

export default storybookInfo;

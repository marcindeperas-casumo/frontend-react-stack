import React from "react";
import casumoTheme, { color } from "./casumoTheme";
import "../src/styles/index.scss";
import "./stories.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    values: [
      { name: "light", value: "#ffffff", default: true },
      { name: "colorful", value: "#0085c1" },
      { name: "dark", value: "#444f4f" },
    ],
  },
  options: {
    theme: casumoTheme,
  },
  info: {
    disable: navigator.userAgent.match(/Chromatic/),
    styles: {
      button: {
        base: {
          background: color.secondary,
        },
      },
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const globalDecorator = Story => (
  <>
    <div id="portal-host-element" />
    <div className="o-wrapper u-padding">
      <Story />
    </div>
  </>
);

export const decorators = [
  (Story, anotherProp, other) => {
    if (Story.parameters?.noGlobalDecorator) {
      return <Story />;
    }

    return globalDecorator(Story);
  },
];

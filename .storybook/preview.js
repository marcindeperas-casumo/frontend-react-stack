import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import casumoTheme, { color } from "./casumoTheme";
import "../src/styles/index.scss";
import "../src/styles/index.css";
import "./stories.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  backgrounds: {
    values: [
      { name: "light", value: "#ffffff", default: true },
      { name: "colorful", value: "#0085c1" },
      { name: "dark", value: "#444f4f" },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
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
  layout: "fullscreen",
  options: {
    theme: casumoTheme,
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
  (Story, details) => {
    if (details.parameters.noGlobalDecorator) {
      return <Story />;
    }

    return globalDecorator(Story);
  },
];

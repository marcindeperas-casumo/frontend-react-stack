import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import "storybook-chromatic";
import casumoTheme, { color } from "./casumoTheme";
import "./stories.scss";
import "../src/styles/index.scss";

const req = require.context("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(
  withBackgrounds([
    { name: "light", value: "#ffffff", default: true },
    { name: "colorful", value: "#0085c1" },
    { name: "dark", value: "#444f4f" },
  ])
);

addDecorator(story => (
  <>
    <div id="portal-host-element" />
    <div className="o-wrapper u-padding">{story()}</div>
  </>
));

addParameters({
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
});

configure(loadStories, module);

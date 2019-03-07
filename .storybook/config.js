import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import "storybook-chromatic";
import casumoTheme from "./casumoTheme";

import "./stories.scss";
import "../src/styles/index.scss";

// Prevent random errors with chromatic
// TypeError: window.URL.createObjectURL is not a function
// Chromatic will (eventually) solve this at there end.
import polyfillWindowForChromatic from "Storybook/utils";

const req = require.context("../src", true, /.stories.js$/);
polyfillWindowForChromatic();

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
});

configure(loadStories, module);

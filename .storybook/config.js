import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import "storybook-chromatic";

import "./stories.scss";
import "../src/styles/index.scss";

const req = require.context("../src", true, /.stories.js$/);

// Prevent random errors with chromatic
// TypeError: window.URL.createObjectURL is not a function
// Chromatic will (eventually) solve this at there end.
import polyfillWindowForChromatic from "Storybook/utils";
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

configure(loadStories, module);

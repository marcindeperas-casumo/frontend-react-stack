import requireContext from "require-context.macro";
import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import "storybook-chromatic";
import casumoTheme, { color } from "./casumoTheme";
import "./stories.scss";
import "../src/styles/index.scss";

const req = requireContext("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator(withKnobs);

addDecorator(Story => (
  <>
    <div id="portal-host-element" />
    <div className="o-wrapper u-padding">
      <Story />
    </div>
  </>
));

addParameters({
  backgrounds: [
    { name: "light", value: "#ffffff", default: true },
    { name: "colorful", value: "#0085c1" },
    { name: "dark", value: "#444f4f" },
  ],
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

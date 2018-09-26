import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import "storybook-chromatic";

import "./stories.scss";
import "../src/styles/index.scss";

const req = require.context("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(story => (
  <div className="o-wrapper u-padding--2xlg">{story()}</div>
));

configure(loadStories, module);

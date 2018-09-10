import React from "react";
import { configure, addDecorator } from "@storybook/react";

import "./stories.scss";
import "../src/styles/index.scss";

const req = require.context("../src", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <div className="o-wrapper u-padding--xlarge">{story()}</div>
));

configure(loadStories, module);

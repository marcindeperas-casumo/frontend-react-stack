// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TrackClick from "./";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("TrackClick", module);

if (isNotChromatic) {
  stories.add("Default", () => <TrackClick />, info({ text: "Default" }));
}

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TrackProvider from "./";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("TrackProvider", module);

if (isNotChromatic) {
  stories.add("Default", () => <TrackProvider />, info({ text: "Default" }));
}

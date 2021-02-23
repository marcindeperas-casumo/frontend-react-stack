// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import TrackProvider from "./";

const stories = storiesOf("TrackProvider", module);

if (isNotChromatic) {
  stories.add("Default", () => <TrackProvider />);
}

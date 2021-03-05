import { storiesOf } from "@storybook/react";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import TrackProvider from "./";

const stories = storiesOf("TrackProvider", module);

if (isNotChromatic) {
  // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
  stories.add("Default", () => <TrackProvider />);
}

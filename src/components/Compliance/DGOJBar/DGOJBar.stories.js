// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DGOJBar } from "./DGOJBar";

const stories = storiesOf("DGOJBar", module);

stories.add("Default", () => {
  return <DGOJBar />;
});

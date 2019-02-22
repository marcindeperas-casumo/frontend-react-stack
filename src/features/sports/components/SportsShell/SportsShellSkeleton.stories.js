/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";

import SportsShellSkeleton from "./SportsShellSkeleton";

const stories = storiesOf("SportsShellSkeleton", module);

stories.add("Default View", () => {
  return <SportsShellSkeleton />;
});

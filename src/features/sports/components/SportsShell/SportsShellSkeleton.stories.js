/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";

import SportsShellSkeleton from "./SportsShellSkeleton";

const stories = storiesOf("SportsShellSkeleton", module);

stories.add(
  "Default View",
  () => <SportsShellSkeleton />,
  info("Default View")
);

// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { Progress } from "./Progress";

const stories = storiesOf("Progress", module);

stories.add("Default", () => {
  const value = number("Percentage value", 33, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });

  return <Progress value={value} />;
});

// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { ProgressCircle } from "./ProgressCircle";

const stories = storiesOf("Progress/ProgressCircle", module);

stories.add("Default", () => {
  const value = number("Percentage value", 33, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });

  return <ProgressCircle value={value} className="u-width--4xlg" />;
});

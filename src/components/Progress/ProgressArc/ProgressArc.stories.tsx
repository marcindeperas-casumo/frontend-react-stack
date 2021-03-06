import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import * as React from "react";
import { ProgressArc } from "./ProgressArc";

const stories = storiesOf("Progress/ProgressArc", module);

stories.add("Default", () => {
  const value = number("Percentage value", 33, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });

  return <ProgressArc value={value} />;
});

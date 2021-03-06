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

  return (
    <>
      <h2>Progress bar</h2>
      <ProgressCircle value={value} className="u-width--4xlg" />

      <h2>Progress 25%</h2>
      <ProgressCircle value={25} className="u-width--4xlg" />

      <h2>Progress 50%</h2>
      <ProgressCircle value={50} className="u-width--4xlg" />

      <h2>Progress 75%</h2>
      <ProgressCircle value={75} className="u-width--4xlg" />

      <h2>Progress 90%</h2>
      <ProgressCircle value={90} className="u-width--4xlg" />
    </>
  );
});

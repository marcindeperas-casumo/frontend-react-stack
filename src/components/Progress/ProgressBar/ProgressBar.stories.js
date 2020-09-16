// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs/react";
import { ProgressBar } from "./ProgressBar";

const stories = storiesOf("Progress/ProgressBar", module);

stories.add("Default", () => {
  return <ProgressBar progress={50} />;
});

stories.add("Playground", () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const fillerClassNames = select(
    "Background color",
    ["t-background-grey-20", "t-background-grey-5"],
    "t-background-grey-20"
  );
  const trackClassNames = select(
    "Foreground color",
    ["t-background-yellow-30", "t-background-green-30"],
    "t-background-yellow-30"
  );

  return (
    <ProgressBar
      progress={progress}
      trackClassNames={trackClassNames}
      fillerClassNames={fillerClassNames}
    />
  );
});

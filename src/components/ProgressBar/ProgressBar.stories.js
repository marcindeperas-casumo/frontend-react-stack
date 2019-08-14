// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs/react";
import { ProgressBar } from "./ProgressBar";

const stories = storiesOf("ProgressBar", module);

const DefaultStory = () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const fillerClassNames = select(
    "Background color",
    ["t-background-grey", "t-background-grey-light-1"],
    "t-background-grey"
  );
  const trackClassNames = select(
    "Foreground color",
    ["t-background-yellow", "t-background-green"],
    "t-background-yellow"
  );

  return (
    <ProgressBar
      progress={progress}
      trackClassNames={trackClassNames}
      fillerClassNames={fillerClassNames}
    />
  );
};

stories.add("Default", DefaultStory);

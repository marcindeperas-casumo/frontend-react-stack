// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs/react";
import { ProgressBar, colorOptions } from "./ProgressBar";

const stories = storiesOf("ProgressBar", module);

const DefaultStory = () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const backgroundColor = select(
    "Background color",
    colorOptions.background,
    colorOptions.background[0]
  );
  const foregroundColor = select(
    "Foreground color",
    colorOptions.foreground,
    colorOptions.foreground[0]
  );

  return (
    <ProgressBar
      progress={progress}
      foregroundColor={foregroundColor}
      backgroundColor={backgroundColor}
    />
  );
};

stories.add("Default", DefaultStory);

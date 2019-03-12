// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { ProgressBar, colourOptions } from "./ProgressBar";

const stories = storiesOf("ProgressBar", module);

const DefaultStory = () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const backgroundColour = select(
    "Background colour",
    colourOptions.background,
    colourOptions.background[0]
  );
  const foregroundColour = select(
    "Foreground colour",
    colourOptions.foreground,
    colourOptions.foreground[0]
  );

  return (
    <ProgressBar
      progress={progress}
      foregroundColour={foregroundColour}
      backgroundColour={backgroundColour}
    />
  );
};

stories.add("Default", DefaultStory, info({ text: "Default" }));

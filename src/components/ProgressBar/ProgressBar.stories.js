// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { ProgressBar } from "./ProgressBar";

const stories = storiesOf("ProgressBar", module);

const DefaultStory = () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });

  return <ProgressBar className="t-color-yellow" progress={progress} />;
};

stories.add("Default", DefaultStory, info({ text: "Default" }));

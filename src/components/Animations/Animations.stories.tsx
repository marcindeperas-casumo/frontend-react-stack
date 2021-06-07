import { storiesOf } from "@storybook/react";
import React from "react";
import { AnimationRunner } from "./AnimationRunner/AnimationRunner";

const stories = storiesOf("Animations/AnimationWizzard", module).addParameters({
  noGlobalDecorator: true,
});

const mock = [
  {
    type: "test",
    time: 2000,
    settings: {
      name: "step 1",
      value: 1,
    },
  },
  {
    type: "test",
    time: 2000,
    settings: {
      name: "step 2",
      value: 2,
    },
  },
];

stories.add("Animation Runner", () => <AnimationRunner animation={mock} />);

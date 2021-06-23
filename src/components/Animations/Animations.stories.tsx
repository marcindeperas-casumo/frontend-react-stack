import { storiesOf } from "@storybook/react";
import React from "react";
import { AnimationRunner } from "./AnimationRunner/AnimationRunner";

const stories = storiesOf("Animations/AnimationWizzard", module).addParameters({
  noGlobalDecorator: true,
});

const mock = [
  {
    animationId: "test",
    time: 2000,
    settings: {
      name: "step 1",
      value: 1,
    },
  },
  {
    animationId: "test",
    time: 2000,
    transitionPoint: 0.5,
    settings: {
      name: "transition step",
    },
  },
  {
    animationId: "test",
    time: 3000,
    settings: {
      name: "step 2",
      value: 2,
    },
  },
];

stories.add("Animation Runner", () => <AnimationRunner animation={mock} />);

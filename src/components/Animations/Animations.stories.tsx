import { storiesOf } from "@storybook/react";
import React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { AnimationRunner } from "./AnimationRunner/AnimationRunner";

const stories = storiesOf("Animations/AnimationWizzard", module).addParameters({
  noGlobalDecorator: true,
});

const springMock = [
  {
    animationId: "springTest",
    settings: {
      destinationColor: `#f00`,
    },
  },
  {
    animationId: "springTest",
    settings: {
      destinationColor: `#00f`,
    },
  },
  {
    animationId: "springTransitionTest",
    isTransition: true,
    settings: {
      destinationColor: `#ff0`,
    },
  },
  {
    animationId: "springTest",
    settings: {
      destinationColor: `#0f0`,
    },
  },
];

if (!isChromatic) {
  stories.add("Spring Clips Animation Runner", () => (
    <AnimationRunner animation={springMock} />
  ));
}

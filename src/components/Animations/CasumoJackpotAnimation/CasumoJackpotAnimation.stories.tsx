import { storiesOf } from "@storybook/react";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

const stories = storiesOf("Animations", module).addParameters({
  noGlobalDecorator: true,
});

const t = {
  buttonText: "Reveal",
  findOutText: "Find out which Jackpot you won",
  winText: "YOU WON A JACKPOT!",
};

const animationConfigMock = [
  {
    animationId: "casumoJackpotIntro",
    settings: { t },
  },
  {
    animationId: "casumoJackpotTransition",
    isTransition: true,
    settings: {},
  },
];

if (isNotChromatic) {
  stories.add("Casumo Jackpot animation", () => (
    <CasumoJackpotAnimation animationConfig={animationConfigMock} />
  ));
}

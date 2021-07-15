import React from "react";
import { AnimationRunner } from "../AnimationRunner/AnimationRunner";
import "./CasumoAnimation.scss";

const t = {
  buttonText: "Reveal",
  findOutText: "Find out which Jackpot you won",
  winText: "YOU WON A JACKPOT!",
};

const springMock = [
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

export const CasumoJackpotAnimation = () => {
  return (
    <div className="o-position--absolute u-width--full u-height--full u-overflow--hidden">
      <div className="c-casumo-animation__fading-in-background-layer t-background-purple-80 o-position--absolute u-width--full u-height--full"></div>
      <AnimationRunner animation={springMock} />
    </div>
  );
};

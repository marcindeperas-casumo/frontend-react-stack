import React from "react";
import { AnimationRunner } from "../AnimationRunner/AnimationRunner";
import "./CasumoAnimation.scss";

export const CasumoJackpotAnimation = ({
  animationConfig,
  onAnimationDone,
}) => {
  const props = {
    animation: animationConfig,
    onAnimationDone,
  };
  return (
    <div className="o-position--absolute u-width--full u-height--full u-overflow--hidden">
      <div className="c-casumo-animation__fading-in-background-layer t-background-purple-80 o-position--absolute u-width--full u-height--full" />
      <AnimationRunner {...props} />
    </div>
  );
};

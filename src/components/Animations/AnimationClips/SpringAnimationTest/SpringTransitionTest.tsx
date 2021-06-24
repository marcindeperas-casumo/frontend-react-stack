import React from "react";
import { useSpring, useChain, useSpringRef, animated, to } from "react-spring";
import type { AnimationClipProps } from "../../constants";

type TSpringTransitionTestProps = {
  config: AnimationClipProps<{}>;
  onShowNext: () => void;
  onTransition: () => void;
};

/**
 * This is an example of an animation clip which can later be composed into full
 * animation, it takes params specific for the clip and performs an animation.
 * time - total allowed time for the animation
 * settings - specific animation clip data
 */

const slide = {
  friction: 100,
  mass: 10,
  tension: 700,
};

export const SpringTransitionTest = ({
  config,
  onShowNext,
  onTransition,
}: TSpringTransitionTestProps) => {
  const ref1 = useSpringRef();
  const ref2 = useSpringRef();

  useSpring({
    from: { x: 0 },
    to: { x: 1 },
    ref: ref1,
    config: slide,
    onRest: onTransition,
  });

  useSpring({
    from: { x: 0 },
    to: { x: 1 },
    ref: ref2,
    config: slide,
    onRest: onShowNext,
  });

  useChain([ref1, ref2], [0, 0.5]);

  return (
    <div>am a overlaying transition step</div>
  );
};

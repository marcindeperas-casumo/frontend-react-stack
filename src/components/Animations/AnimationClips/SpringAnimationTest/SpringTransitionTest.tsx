import React from "react";
import { useSpring, useChain, useSpringRef } from "react-spring";
import type { AnimationClipProps } from "../../constants";

type TSpringTransitionTestProps = {
  config: AnimationClipProps<{}>;
  onShowNext: () => void;
  onTransition: () => void;
};

const slide = {
  friction: 100,
  mass: 10,
  tension: 700,
};

export const SpringTransitionTest = ({
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

  return <div>am a overlaying transition step</div>;
};

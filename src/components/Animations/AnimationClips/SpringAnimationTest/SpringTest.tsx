import React from "react";
import { useSpring, animated } from "react-spring";
import type { AnimationClipProps } from "../../constants";

export type TSpringTestSettings = {
  destinationColor: string;
};

type TSpringTestProps = {
  config: AnimationClipProps<TSpringTestSettings>;
  onShowNext: () => void;
};

/**
 * This is an example of an animation clip which can later be composed into full
 * animation, it takes params specific for the clip and performs an animation.
 * time - total allowed time for the animation
 * settings - specific animation clip data
 */

export const SpringTest = ({ config, onShowNext, order }: TSpringTestProps) => {
  const styles1 = useSpring({
    from: { backgroundColor: "#000" },
    to: { backgroundColor: config.settings.destinationColor },
    onRest: () => {
      onShowNext();
    },
  });
  return <animated.div style={styles1}>{order} hey</animated.div>;
};

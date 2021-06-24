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

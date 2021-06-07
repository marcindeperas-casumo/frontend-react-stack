import React from "react";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";
import { stepResolver } from "./stepResolver";

type TProps = {
  onAnimationEnd: () => void;
  definition: AnimationClipProps<AvailableAnimationClipsProps>;
};

export const AnimationStep = ({ definition, onAnimationEnd }: TProps) => {
  const ClipComponent = stepResolver(definition);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd();
    }, definition.time + 500);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <ClipComponent time={definition.time} settings={definition.settings} />
  );
};

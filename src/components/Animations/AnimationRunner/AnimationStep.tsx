import React from "react";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";
import { stepResolver } from "./stepResolver";

type TProps = {
  onShowNext: () => void;
  onTransition: () => void;
  config: AnimationClipProps<AvailableAnimationClipsProps>;
};

export const AnimationStep = ({ config, onShowNext, onTransition }: TProps) => {
  const ClipToRun = stepResolver(config);

  return (
    <ClipToRun
      config={config}
      onShowNext={onShowNext}
      onTransition={onTransition}
    />
  );
};

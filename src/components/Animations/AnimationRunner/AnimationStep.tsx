import React from "react";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";
import { stepResolver } from "./stepResolver";

type TProps = {
  onShowNext: () => void;
  config: AnimationClipProps<AvailableAnimationClipsProps>;
};

export const AnimationStep = ({ config, onShowNext }: TProps) => {
  const ClipToRun = stepResolver(config);
  const [showNextDispatched, setShowNextDispatched] = React.useState(false);

  const showNext = () => {
    if (!showNextDispatched) {
      setShowNextDispatched(true);
      onShowNext();
    }
  };

  //those will only run when there is config.time
  React.useEffect(() => {
    const animationEndTimer = config.time
      ? setTimeout(() => {
          showNext();
        }, config.time)
      : null;

    const transitionTimer =
      config.transitionPoint && config.time
        ? setTimeout(() => {
            showNext();
          }, config.transitionPoint * config.time)
        : null;

    return () => {
      clearTimeout(animationEndTimer);
      clearTimeout(transitionTimer);
    };
  });

  return <ClipToRun config={config} onShowNext={showNext} />;
};

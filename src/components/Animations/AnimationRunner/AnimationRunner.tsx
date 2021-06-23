import React from "react";
import type {
  AnimationClipProps,
  AvailableAnimationClipsProps,
} from "../constants";
import { AnimationStep } from "./AnimationStep";

type TProps = {
  animation: Array<AnimationClipProps<AvailableAnimationClipsProps>>;
  onNextStep?: (step: number) => void;
  onAnimationDone?: () => void;
  start?: boolean;
};

export const AnimationRunner = ({
  animation,
  onNextStep = () => {},
  onAnimationDone = () => {},
  start = true,
}: TProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const showNext = () => {
    if (animation.length > currentStep + 1) {
      onNextStep(currentStep);
      setCurrentStep(currentStep + 1);
    } else {
      onAnimationDone();
    }
  };

  return (
    <>
      {start &&
        animation.map((step, idx) =>
          idx <= currentStep ? (
            <AnimationStep key={idx} config={step} onShowNext={showNext} />
          ) : null
        )}
    </>
  );
};

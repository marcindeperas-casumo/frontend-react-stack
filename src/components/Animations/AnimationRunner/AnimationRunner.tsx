import React from "react";
import type {
  AnimationClipProps,
  AvailableAnimationClipsProps,
} from "../constants";
import { AnimationStep } from "./AnimationStep";

type TProps = {
  animation: Array<AnimationClipProps<AvailableAnimationClipsProps>>;
  onNextStep?: (step: AnimationClipProps<AvailableAnimationClipsProps>) => void;
  start?: boolean;
};

export const AnimationRunner = ({
  animation,
  onNextStep,
  start = true,
}: TProps) => {
  const [currentStep, setCurrentStep] = React.useState<number>();

  React.useEffect(() => {
    if (start && isNaN(currentStep)) {
      setCurrentStep(0);
    }
  }, [start, currentStep]);

  const onAnimationEnd = () => {
    if (currentStep < animation.length - 1) {
      setCurrentStep(currentStep + 1);
      if (onNextStep) {
        onNextStep(animation[currentStep]);
      }
    }
  };

  return (
    currentStep >= 0 && (
      <AnimationStep
        key={currentStep}
        definition={animation[currentStep]}
        onAnimationEnd={onAnimationEnd}
      />
    )
  );
};

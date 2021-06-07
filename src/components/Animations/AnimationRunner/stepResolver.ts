import { ClipTest } from "../AnimationClips/ClipTest/ClipTest";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";

const animationClipsMap = {
  test: ClipTest,
};

export const stepResolver = (
  animationStepDefinition: AnimationClipProps<AvailableAnimationClipsProps>
) => {
  return animationClipsMap[animationStepDefinition.type];
};

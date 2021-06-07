import { ClipTest } from "../AnimationClips/ClipTest/ClipTest";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";

// Map all new clips here so they will be avaliable to compose into animation
const animationClipsMap = {
  test: ClipTest,
};

export const stepResolver = (
  animationStepDefinition: AnimationClipProps<AvailableAnimationClipsProps>
) => {
  return animationClipsMap[animationStepDefinition.type];
};

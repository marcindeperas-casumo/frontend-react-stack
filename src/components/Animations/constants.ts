import { TClipTestSettings } from "./AnimationClips/ClipTest/ClipTest";

export type AvailableAnimationClipsProps = TClipTestSettings | {};

export type AnimationClipProps<ClipPropsType> = {
  animationId: string;
  time: number;
  transitionPoint?: number; // from 0 to 1
  settings: ClipPropsType;
};

export type TStepCallback = (
  step: AnimationClipProps<AvailableAnimationClipsProps>
) => void;

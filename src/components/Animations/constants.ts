import { TClipTestSettings } from "./AnimationClips/ClipTest/ClipTest";

export type AvailableAnimationClipsProps = TClipTestSettings | {};

export type AnimationClipProps<ClipPropsType> = {
  type: string;
  time: number;
  settings: ClipPropsType;
};

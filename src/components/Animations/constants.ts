import { TSpringTestSettings } from "./AnimationClips/SpringAnimationTest";

export type AvailableAnimationClipsProps = TSpringTestSettings | {};

export type AnimationClipProps<ClipPropsType> = {
  animationId: string;
  time?: number;
  isTransition?: boolean;
  settings: ClipPropsType;
};

import { TSpringTestSettings } from "./AnimationClips/SpringAnimationTest";

export type AvailableAnimationClipsProps = TSpringTestSettings | {};

export const animationAssetsCmsUrl = jackpotSlug =>
  `jackpots-win-animations-assets.${jackpotSlug}`;

export type AnimationClipProps<ClipPropsType> = {
  animationId: string;
  time?: number;
  isTransition?: boolean;
  settings: ClipPropsType;
};

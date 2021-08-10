import { AmountStep as CasumoJackpotAmount } from "../AnimationClips/CasumoJackpot/AmountStep/AmountStep";
import { IntroStep as CasumoJackpotIntro } from "../AnimationClips/CasumoJackpot/IntroStep/IntroStep";
import { TransitionStep as CasumoJackpotTransition } from "../AnimationClips/CasumoJackpot/TransitionStep/TransitionStep";
import { WheelContainer as CasumoJackpotWheel } from "../AnimationClips/CasumoJackpot/WheelStep/WheelContainer";
import {
  SpringTest,
  SpringTransitionTest,
} from "../AnimationClips/SpringAnimationTest";
import { AnimationClipProps, AvailableAnimationClipsProps } from "../constants";

// Map all new clips here so they will be avaliable to compose into animation
const animationClipsMap = {
  springTest: SpringTest,
  springTransitionTest: SpringTransitionTest,
  casumoJackpotIntro: CasumoJackpotIntro,
  casumoJackpotAmount: CasumoJackpotAmount,
  casumoJackpotTransition: CasumoJackpotTransition,
  casumoJackpotWheel: CasumoJackpotWheel,
};

export const stepResolver = (
  animationStepDefinition: AnimationClipProps<AvailableAnimationClipsProps>
) => {
  const clip = animationClipsMap[animationStepDefinition.animationId];
  if (!clip) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(
      `No animation clip found for: ${animationStepDefinition.animationId}`
    );
  }
  return animationClipsMap[animationStepDefinition.animationId];
};

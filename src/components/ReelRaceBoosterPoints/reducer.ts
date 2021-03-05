import { UPDATE_ANIMATION, UPDATE_PREV_VALUES } from "./const";

type TAnimationValue = null | string;
type TBoosterValue = null | number;

type TAnimationState = {
  active: boolean;
  basePoints: TAnimationValue;
  extraPoints: TAnimationValue;
};

type TState = {
  animation: TAnimationState;
  boosters: TBoostersState;
};

type TActions =
  | { type: typeof UPDATE_ANIMATION; payload: TAnimationState }
  | { type: typeof UPDATE_PREV_VALUES; payload: TBoostersState };

export type TBoostersState = {
  bigWins: TBoosterValue;
  megaWins: TBoosterValue;
  triples: TBoosterValue;
  wins: TBoosterValue;
};

export const reducer = (prevState: TState, action: TActions): TState => {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (action.type) {
    case UPDATE_ANIMATION:
      return {
        ...prevState,
        animation: {
          ...prevState.animation,
          ...action.payload,
        },
      };

    case UPDATE_PREV_VALUES:
      return {
        ...prevState,
        boosters: {
          ...prevState.boosters,
          ...action.payload,
        },
      };

    default:
      return prevState;
  }
};

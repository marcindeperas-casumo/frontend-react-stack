// @flow
import { UPDATE_ANIMATION, UPDATE_PREV_VALUES } from "./const";

type AnimationState = {
  active: boolean,
  basePoints: null | String,
  extraPoints: null | String,
};

type BoostersState = {
  bigWins: number,
  megaWins: number,
  triples: number,
  wins: number,
};

type State = {
  animation: AnimationState,
  boosters: BoostersState,
};

type Actions =
  | { type: UPDATE_ANIMATION, payload: AnimationState }
  | { type: UPDATE_PREV_VALUES, payload: BoostersState };

export const reducer = (prevState: State, action: Actions): State => {
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

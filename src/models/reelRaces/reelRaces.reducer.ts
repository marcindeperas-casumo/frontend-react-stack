// @flow
import * as R from "ramda";
import type { Action } from "./reelRaces.actions";

const DEFAULT_STATE = {
  leaderboard: {},
  order: [],
};
type State = typeof DEFAULT_STATE;

export function reelRacesReducer(
  state: State = DEFAULT_STATE,
  action: Action
): State {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (action.type) {
    case "RR/INITIALIZE_LEADERBOARD": {
      if (R.isEmpty(state.leaderboard)) {
        return {
          leaderboard: R.pipe(
            R.map(x => [x.playerId, x]),
            R.fromPairs
          )(action.initialLeaderboard),
          order: R.pluck("playerId", action.initialLeaderboard),
        };
      }

      return state;
    }
    case "RR/UPDATE_LEADERBOARD":
      return {
        leaderboard: action.leaderboard,
        order: R.pipe(
          R.values,
          R.sortBy(R.prop("position")),
          R.pluck("playerId")
        )(action.leaderboard),
      };
    default:
      return state;
  }
}

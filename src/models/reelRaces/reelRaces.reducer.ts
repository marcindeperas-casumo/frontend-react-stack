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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerId' does not exist on type 'unknow... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
        order: R.pipe(
          R.values,
          R.sortBy(R.prop("position")),
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          R.pluck("playerId")
        )(action.leaderboard),
      };
    default:
      return state;
  }
}

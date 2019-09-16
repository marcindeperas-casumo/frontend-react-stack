// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { reelRacesSelector } from "Models/reelRaces";
import { RR_STATE } from "Models/reelRaceWidget";
import { playerIdSelector } from "Models/handshake";

export const reelRaceWidgetSelector = createSelector(
  reelRacesSelector,
  reelRaces => {
    const isScheduledInFuture = R.propSatisfies(R.lt(Date.now()), "startTime");
    const iStarted = R.propEq("status", RR_STATE.STARTED);
    const iScheduled = R.propEq("status", RR_STATE.SCHEDULED);
    const isNotFinished = R.propSatisfies(R.lt(Date.now()), "endTime");
    const playerOptedIn = R.propEq("opted", true);
    const optedStarted = R.allPass([iStarted, isNotFinished, playerOptedIn]);
    const optedScheduled = R.allPass([
      iScheduled,
      isScheduledInFuture,
      playerOptedIn,
    ]);

    return R.pipe(
      R.values,
      R.sortBy(R.prop("startTime")),
      R.either(R.find(optedStarted), R.find(optedScheduled))
    )(reelRaces);
  }
);

export const reelRacePlayerSpinsSelector = createSelector(
  reelRaceWidgetSelector,
  playerIdSelector,
  (reelRace, playerId) => {
    if (reelRace && playerId) {
      return R.pipe(
        R.prop("leaderboard"),
        R.prop(playerId),
        R.prop("remainingSpins")
      )(reelRace);
    }
  }
);

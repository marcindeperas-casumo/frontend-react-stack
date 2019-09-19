// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { reelRacesSelector } from "Models/reelRaces";

const playerOptedIn = R.propEq("opted", true);

export const reelRaceStartedSelector = createSelector(
  reelRacesSelector,
  reelRaces => {
    const iStarted = R.propSatisfies(R.gt(Date.now()), "startTime");
    const isNotFinished = R.propSatisfies(R.lt(Date.now()), "endTime");
    const optedStarted = R.allPass([iStarted, isNotFinished, playerOptedIn]);

    return R.pipe(
      R.values,
      R.sortBy(R.prop("startTime")),
      R.find(optedStarted),
      R.defaultTo(null)
    )(reelRaces);
  }
);

export const reelRaceScheduledSelector = createSelector(
  reelRacesSelector,
  reelRaces => {
    const isScheduledInFuture = R.propSatisfies(R.lt(Date.now()), "startTime");
    const optedScheduled = R.allPass([isScheduledInFuture, playerOptedIn]);

    return R.pipe(
      R.values,
      R.sortBy(R.prop("startTime")),
      R.find(optedScheduled),
      R.defaultTo(null)
    )(reelRaces);
  }
);

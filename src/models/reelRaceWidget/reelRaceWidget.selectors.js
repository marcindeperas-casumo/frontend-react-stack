// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { reelRacesSelector } from "Models/reelRaces";

export const reelRaceWidgetSelector = createSelector(
  reelRacesSelector,
  reelRaces => {
    const iStarted = R.propEq("status", "Started");
    const playerOptedIn = R.propEq("opted", true);
    const optedStarted = R.anyPass([iStarted, playerOptedIn]);

    return R.pipe(
      R.values,
      R.sortBy(R.prop("startTime")),
      R.find(optedStarted)
    )(reelRaces);
  }
);

// @flow
import * as R from "ramda";

const playerOptedIn = R.propEq("optedIn", true);

export function getCurrentReelRace<T>(reelRaces: Array<T>): ?T {
  const isNotFinished = R.propSatisfies(R.lt(Date.now()), "endTime");
  const optedNotFinished = R.allPass([isNotFinished, playerOptedIn]);

  return R.pipe(
    R.sortBy(R.prop("startTime")),
    R.filter(optedNotFinished),
    R.prop(0)
  )(reelRaces);
}

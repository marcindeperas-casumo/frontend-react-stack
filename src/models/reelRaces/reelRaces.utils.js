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

export function getClosestReelRace<T>(reelRaces: Array<T>): ?T {
  return R.pipe(
    R.sortBy(R.prop("startTime")),
    R.prop(0)
  )(reelRaces);
}

export const calculateProgress = (
  startTime: ?number = null,
  endTime: ?number = null,
  now: number = Date.now()
) => {
  if (!startTime || !endTime || now < startTime) {
    return 0;
  }
  if (now >= endTime) {
    return 1;
  }
  return (now - startTime) / (endTime - startTime);
};

export const getLaurelColor = (position: number) => {
  const colors = ["grey-0", "yellow-30", "grey-20", "brown-30"];

  return position < colors.length ? colors[position] : colors[0];
};

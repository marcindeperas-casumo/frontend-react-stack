// @flow
import * as R from "ramda";

const playerOptedIn = R.propEq("optedIn", true);

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export function getCurrentReelRace<T>(reelRaces: Array<T>): ?T {
  const isNotFinished = R.propSatisfies(R.lt(Date.now()), "endTime");
  const optedNotFinished = R.allPass([isNotFinished, playerOptedIn]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'T'.
  return R.pipe(
    R.sortBy(R.prop("startTime")),
    R.filter(optedNotFinished),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.prop(0)
  )(reelRaces);
}

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export function getClosestReelRace<T>(reelRaces: Array<T>): ?T {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'T'.
  return R.pipe(
    R.sortBy(R.prop("startTime")),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.prop(0)
  )(reelRaces);
}

export const calculateProgress = (
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  startTime: ?number = null,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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

export const getLaurelColor = (position: number, highlighted?: boolean) => {
  const colors = ["grey-70", "yellow-30", "grey-20", "brown-30"];
  const colorsHighlighted = ["grey-70", "yellow-90", "grey-20", "brown-30"];

  const pallete = highlighted ? colorsHighlighted : colors;

  return position < pallete.length ? pallete[position] : pallete[0];
};

export const getProgressColor = (progress: number) => {
  if (progress >= 90) {
    return "red-30";
  }
  if (progress >= 75) {
    return "yellow-30";
  }
  return "teal-50";
};

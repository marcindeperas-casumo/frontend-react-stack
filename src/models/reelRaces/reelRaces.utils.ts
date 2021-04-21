import * as R from "ramda";

const playerOptedIn = R.propEq("optedIn", true);

export function getCurrentReelRace<T>(reelRaces: Array<T>): T | undefined {
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

export function getClosestReelRace<T>(reelRaces: Array<T>): T | undefined {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'T'.
  return R.pipe(
    R.sortBy(R.prop("startTime")),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.prop(0)
  )(reelRaces);
}

export const calculateProgress = (
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  startTime: number = null | undefined,
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  endTime: number = null | undefined,
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

export const getLaurelClassName = (position: number, highlighted?: boolean) => {
  const colors = [
    "text-grey-70",
    "text-yellow-30",
    "text-grey-20",
    "text-brown-30",
  ];
  const colorsHighlighted = [
    "text-grey-70",
    "text-yellow-90",
    "text-grey-20",
    "text-brown-30",
  ];

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

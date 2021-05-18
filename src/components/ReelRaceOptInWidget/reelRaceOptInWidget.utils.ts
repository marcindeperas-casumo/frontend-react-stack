import { DateTime } from "luxon";

export const DEFAULT_REMAINING = "--:--";

export function getRemainingTime(
  start: number,
  end: number,
  inProgress: boolean
) {
  const init = inProgress ? end : start;

  // for case when user keeps the widget opened
  // after RR has ended
  if (init - Number(new Date()) < 0) {
    return DEFAULT_REMAINING;
  }

  return DateTime.fromMillis(init)
    .diff(DateTime.fromMillis(Number(new Date())))
    .toFormat("mm:ss");
}

export function getDuration(start: number, end: number) {
  return DateTime.fromMillis(end)
    .diff(DateTime.fromMillis(start))
    .toFormat("mm");
}

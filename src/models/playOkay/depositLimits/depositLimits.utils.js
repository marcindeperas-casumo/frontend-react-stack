// @flow
import * as R from "ramda";
import type {
  AllLimitsOnlyValues,
  DepositKinds,
} from "Models/playOkay/depositLimits";

export const limitTypes: ["daily", "weekly", "monthly"] = [
  "daily",
  "weekly",
  "monthly",
];
// flow magic to ensure no typos in daily, weekly, monthly
/*:: (limitTypes[0]: DepositKinds), (limitTypes[1]: DepositKinds), (limitTypes[2]: DepositKinds) */

export type LimitChange = "unchanged" | "increase" | "decrease" | "removed";
export type LimitsDiff = { [DepositKinds]: LimitChange };

export function diffLimits({
  before,
  after,
}: {
  before: AllLimitsOnlyValues,
  after: AllLimitsOnlyValues,
}): LimitsDiff {
  return limitTypes.reduce(
    (acc, x) => ({
      ...acc,
      [x]: R.cond([
        [R.equals(before[x]), R.always(("unchanged": LimitChange))],
        [R.isNil, R.always(("removed": LimitChange))],
        /**
         * This one might be suprising at first. Think of nil in limit as of infinity.
         * Every time you set new limit you are decreasing it from infinity so it
         * falls into the flow of decreasing limits.
         */
        [R.always(R.isNil(before[x])), R.always(("decrease": LimitChange))],
        [R.gt(before[x]), R.always(("decrease": LimitChange))],
        [R.lt(before[x]), R.always(("increase": LimitChange))],
      ])(after[x]),
    }),
    {}
  );
}

export const checkIfConditionsApply: LimitsDiff => Boolean = R.pipe(
  R.values,
  R.any(
    // if user increased/removed limit it needs additional approval
    R.anyPass([
      R.equals(("increase": LimitChange)),
      R.equals(("removed": LimitChange)),
    ])
  )
);

type getSpecificKinds1 = (LimitChange, LimitsDiff) => Array<DepositKinds>;
type getSpecificKinds2 = LimitChange => LimitsDiff => Array<DepositKinds>;
export const getSpecificKinds: getSpecificKinds1 & getSpecificKinds2 = R.curry(
  (kind, diff) =>
    R.pipe(
      R.pickBy(R.equals(kind)),
      R.keys
    )(diff)
);

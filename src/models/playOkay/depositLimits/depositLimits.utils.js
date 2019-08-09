// @flow
import * as R from "ramda";
import type {
  AllLimitsOnlyValues,
  DepositKinds,
  LimitChangeType,
} from "Models/playOkay/depositLimits";

export const limitTypes: ["daily", "weekly", "monthly"] = [
  "daily",
  "weekly",
  "monthly",
];
// flow magic to ensure no typos in daily, weekly, monthly
/*:: (limitTypes[0]: DepositKinds), (limitTypes[1]: DepositKinds), (limitTypes[2]: DepositKinds) */

export type LimitsDiff = { [DepositKinds]: LimitChangeType };

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
        [R.equals(before[x]), R.always(("unchanged": LimitChangeType))],
        [R.isNil, R.always(("removed": LimitChangeType))],
        /**
         * This one might be surprising at first. Think of nil in limit as of infinity.
         * Every time you set new limit you are decreasing it from infinity so it
         * falls into the flow of decreasing limits.
         */
        [R.always(R.isNil(before[x])), R.always(("decrease": LimitChangeType))],
        [R.gt(before[x]), R.always(("decrease": LimitChangeType))],
        [R.lt(before[x]), R.always(("increase": LimitChangeType))],
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
      R.equals(("increase": LimitChangeType)),
      R.equals(("removed": LimitChangeType)),
    ])
  )
);

type getSpecificKinds1 = (LimitChangeType, LimitsDiff) => Array<DepositKinds>;
type getSpecificKinds2 = LimitChangeType => LimitsDiff => Array<DepositKinds>;
export const getSpecificKinds: getSpecificKinds1 & getSpecificKinds2 = R.curry(
  (kind, diff) =>
    R.pipe(
      R.pickBy(R.equals(kind)),
      R.keys
    )(diff)
);

const defaultLimit: AllLimitsOnlyValues = {
  daily: null,
  weekly: null,
  monthly: null,
};
export const getChangedLimitsValues = ({
  before = defaultLimit,
  after = defaultLimit,
}: {
  before: AllLimitsOnlyValues,
  after: AllLimitsOnlyValues,
}): AllLimitsOnlyValues =>
  R.pipe(
    R.filter(
      (depositType: DepositKinds) =>
        before?.[depositType] !== after?.[depositType]
    ),
    R.pick(R.__, after)
  )((["daily", "weekly", "monthly"]: DepositKinds[]));

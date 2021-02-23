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

// @ts-expect-error ts-migrate(2690) FIXME: 'DepositKinds' only refers to a type, but is being... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
        [R.equals(before[x]), R.always(("unchanged": LimitChangeType))],
        // @ts-expect-error ts-migrate(2464) FIXME: A computed property name must be of type 'string',... Remove this comment to see the full error message
        [R.isNil, R.always(("removed": LimitChangeType))],
        /**
         * This one might be surprising at first. Think of nil in limit as of infinity.
         * Every time you set new limit you are decreasing it from infinity so it
         * falls into the flow of decreasing limits.
         */
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
        [R.always(R.isNil(before[x])), R.always(("decrease": LimitChangeType))],
        // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        [R.gt(before[x]), R.always(("decrease": LimitChangeType))],
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
        [R.lt(before[x]), R.always(("increase": LimitChangeType))],
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'x'.
      ])(after[x]),
    }),
    {}
  );
}

// @ts-expect-error ts-migrate(2322) FIXME: Type '() => boolean' is not assignable to type 'Bo... Remove this comment to see the full error message
export const checkIfConditionsApply: LimitsDiff => Boolean = R.pipe(
  R.values,
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  R.any(
    // if user increased/removed limit it needs additional approval
    R.anyPass([
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'SafePred... Remove this comment to see the full error message
      R.equals(("increase": LimitChangeType)),
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
      R.equals(("removed": LimitChangeType)),
    ])
  )
);

type getSpecificKinds1 = (LimitChangeType, LimitsDiff) => Array<DepositKinds>;
type getSpecificKinds2 = LimitChangeType => LimitsDiff => Array<DepositKinds>;
// @ts-expect-error ts-migrate(2322) FIXME: Type 'Curry<(kind: any, diff: any) => string[]>' i... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
  R.pipe(
    R.filter(
      (depositType: DepositKinds) =>
        before?.[depositType] !== after?.[depositType]
    ),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.pick(R.__, after)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  )((["daily", "weekly", "monthly"]: DepositKinds[]));

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

export type LimitsDiff = Record<DepositKinds, LimitChangeType>;

export function diffLimits({
  before,
  after,
}: {
  before: AllLimitsOnlyValues;
  after: AllLimitsOnlyValues;
}): LimitsDiff {
  return limitTypes.reduce(
    (acc, x) => ({
      ...acc,
      [x]: R.cond([
        [R.equals(before[x]), R.always("unchanged")],
        [R.isNil, R.always("removed")],
        [R.always(R.isNil(before[x])), R.always("created")],
        [R.gt(before[x]), R.always("decrease")],
        [R.lt(before[x]), R.always("increase")],
      ])(after[x]),
    }),
    {} as LimitsDiff
  );
}

export const checkIfConditionsApply: (limitsDiff: LimitsDiff) => Boolean =
  R.pipe(
    R.values,
    R.any(
      // if user increased/removed limit it needs additional approval
      R.anyPass([R.equals("increase"), R.equals("removed")])
    )
  );

export const getSpecificKinds = R.curry((kind, diff) =>
  R.pipe(R.pickBy(R.equals(kind)), R.keys)(diff)
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
  before: AllLimitsOnlyValues;
  after: AllLimitsOnlyValues;
}): AllLimitsOnlyValues =>
  R.pipe(
    R.filter(
      (depositType: DepositKinds) =>
        before?.[depositType] !== after?.[depositType]
    ),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.pick(R.__, after)
  )(["daily", "weekly", "monthly"]);

// @flow
export type DepositKinds = "daily" | "weekly" | "monthly";
export type AllLimitsOnlyValues = {
  daily: ?number,
  monthly: ?number,
  weekly: ?number,
};
export type AllLimits = {
  currency: string,
  daily: ?number,
  monthly: ?number,
  weekly: ?number,
};
type LimitMonetaryAmount = {
  schema: "MONETARY_AMOUNT",
  limit: {
    value: {
      amount: number,
      currency: string,
    },
  },
};
export type LimitLock = {
  expiresOn: string, // ISO8601, date and time
};
export type LimitMonetaryAmountPeriodsAndIncreased = {
  schema: "MONETARY_AMOUNT_PERIODS_AND_INCREASED",
  limit: {
    value: AllLimits,
  },
  lock?: LimitLock,
};

export type DepositLimitKind =
  | "DGOJ_UNVERIFIED_ACCOUNT_DEPOSIT_LIMIT"
  | "DGOJ_DEPOSIT_LIMIT";
export type DepositLimit = {
  kind: DepositLimitKind,
  undoable: boolean,
} & (LimitMonetaryAmount | LimitMonetaryAmountPeriodsAndIncreased);

export type DepositLimitPreadjustRules =
  | "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES"
  | "APPROVAL_REQUIRED_FOR_INCREASE"
  | "RESPONSIBLE_GAMBLING_TEST_REQUIRED"
  | "DECREASE_EFFECTIVE_IMMEDIATELY"
  | "REVOCATION_ALLOWED";

type ISO8601Duration = string; // ie. P7D, see: https://en.wikipedia.org/wiki/ISO_8601#Durations
export type DepositLimitPreadjust = {
  schema: "MONETARY_AMOUNT_PERIODS_AND_INCREASED" | "MONETARY_AMOUNT", // TODO: will we ever get monetary amount? it would require us to ask for DGOJ_UNVERIFIED_ACCOUNT_DEPOSIT_LIMIT
  increaseEffectiveAfter: ISO8601Duration,
  increaseProhibitedAfterwardsFor: ISO8601Duration,
  kind: DepositLimitKind,
  playerId: string,
  rules: Array<DepositLimitPreadjustRules>,
};

export type DepositLimitsReduxStore = {|
  limits: ?AllLimits,
  preadjust: ?DepositLimitPreadjust,
  lock: ?LimitLock,
  undoable: ?boolean,
  remaining: ?AllLimitsOnlyValues,
|};

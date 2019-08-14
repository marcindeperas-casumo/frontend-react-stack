// @flow
export type DepositKinds = "daily" | "weekly" | "monthly";
export type LimitChangeType = "unchanged" | "increase" | "decrease" | "removed";
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

type ISO8601DateTime = string;
export type ResponsibleGamblingTest = {|
  responsibleGamblingQuestionnaireStatus: "SUCCESS" | "FAILED" | "NONE", // NONE if player hasn't attempted test yet
  responsibleGamblingQuestionnaireLastAttempt: ?ISO8601DateTime, // null if there was no previous attempt, with milliseconds and retrofit
  responsibleGamblingQuestionnaireAttemptAllowed: boolean,
|};

export type DepositLimitsAdjustment = {
  approvalRequired: boolean,
  confirmationRequired: boolean,
  effectiveFrom: ISO8601DateTime,
  reviewerApproved: boolean,
  value: {
    daily?: number,
    monthly?: number,
    weekly?: number,
  },
};

export type DepositLimitsHistoryType = Array<{
  id: string,
  timestamp: ISO8601DateTime,
  type: LimitChangeType,
  changes: {
    daily?: ?number,
    monthly?: ?number,
    weekly?: ?number,
  },
}>;

export type DepositLimitsReduxStore = {|
  limits: ?AllLimits,
  preadjust: ?DepositLimitPreadjust,
  lock: ?LimitLock,
  undoable: ?boolean,
  remaining: ?AllLimitsOnlyValues,
  responsibleGamblingTest: ?ResponsibleGamblingTest,
  pendingLimitChanges: ?DepositLimitsAdjustment,
  history: ?DepositLimitsHistoryType,
|};

type LimitAdjustmentState = {
  undoable: boolean,
  limit?: {
    value: AllLimits,
  },
  lock?: { expiresOn: ISO8601DateTime },
};
export type LimitAdjustmentHistory = {
  id: string,
  kind: "DGOJ_DEPOSIT_LIMIT",
  playerId: string,
  schema: "MONETARY_AMOUNT_PERIODS_AND_INCREASED",
  request: {
    type:
      | "PLAYER_REGISTERED" // initial, last on the list. Shouldn't be shown?
      | "ADJUST"
      | "ADJUSTMENT_EFFECTIVE", // shows up after approved adjustment takes effect
    value: AllLimits,
    id: string,
    timestamp: ISO8601DateTime,
    initiator: {
      id: string, // starts with "PID:"
    },
  },
  stateBefore: LimitAdjustmentState,
  stateAfter: LimitAdjustmentState,
};

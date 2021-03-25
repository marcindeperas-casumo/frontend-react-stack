import type {
  AllLimits,
  AllLimitsOnlyValues,
  LimitLock,
  DepositKinds,
  DepositLimitsAdjustment,
} from "Models/playOkay/depositLimits";

export type ValidationTranslations = {
  lock: string;
  lowest_limit: string;
  highest_limit: string;
  cant_be_higher: string;
  cant_be_lower: string;
  has_to_be_lower_than_pending_adjustment: string;
  has_to_be_lower_while_locked: string;
  has_to_be_lower_after_responsible_gambling_test_failed: string;
  has_to_be_lower_while_not_risk_safe: string;
  cant_be_higher_while_any_adjustment_is_pending: string;
};

export type Translations = {
  daily_short: string;
  daily: string;
  weekly_short: string;
  weekly: string;
  monthly_short: string;
  monthly: string;
  remove_selected: string;
  input_validation: ValidationTranslations;
};

export type FormProps = {
  currency: string;
  locale: string;
  responsibleGamblingTestCanBeTaken: boolean;
  increasesOrRevocationsBlocked?: boolean;
  limits: AllLimits;
  limitChanges?: AllLimitsOnlyValues;
  initiallyVisible: DepositKinds;
  applyLimitsChanges: (allLimits: AllLimitsOnlyValues) => void;
  lock: LimitLock | undefined;
  pendingLimitChanges: DepositLimitsAdjustment | undefined;
  fetchTranslations: () => void;
};

export type FormPropsWithTranslations = FormProps & { t: Translations };

export type Limits = {
  daily: number | undefined;
  weekly: number | undefined;
  monthly: number | undefined;
};

export type LimitInput = {
  value: number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type LimitInputs = {
  daily: LimitInput;
  weekly: LimitInput;
  monthly: LimitInput;
};

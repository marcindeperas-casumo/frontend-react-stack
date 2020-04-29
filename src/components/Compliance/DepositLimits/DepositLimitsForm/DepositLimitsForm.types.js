// @flow
import type {
  AllLimits,
  AllLimitsOnlyValues,
  LimitLock,
  DepositKinds,
  ResponsibleGamblingTest,
  DepositLimitsAdjustment,
} from "Models/playOkay/depositLimits";

export type ValidationTranslations = {
  lock: string,
  lowest_limit: string,
  highest_limit: string,
  cant_be_higher: string,
  cant_be_lower: string,
  has_to_be_lower_than_pending_adjustment: string,
  has_to_be_lower_while_locked: string,
  has_to_be_lower_after_responsible_gambling_test_failed: string,
};

export type Translations = {
  daily_short: string,
  daily: string,
  weekly_short: string,
  weekly: string,
  monthly_short: string,
  monthly: string,
  remove_selected: string,
  input_validation: ValidationTranslations,
};

export type FormProps = {
  currency: string,
  locale: string,
  responsibleGamblingTestRequired?: boolean,
  responsibleGamblingTest: ResponsibleGamblingTest,
  limits: AllLimits,
  limitChanges?: AllLimitsOnlyValues,
  initiallyVisible: DepositKinds,
  applyLimitsChanges: AllLimitsOnlyValues => void,
  lock: ?LimitLock,
  pendingLimitChanges: ?DepositLimitsAdjustment,
  fetchTranslations: () => void,
};

export type FormPropsWithTranslations = FormProps & { t: Translations };

export type Limits = {
  daily: ?number,
  weekly: ?number,
  monthly: ?number,
};

export type LimitInput = {
  value: ?number,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type LimitInputs = {
  daily: LimitInput,
  weekly: LimitInput,
  monthly: LimitInput,
};

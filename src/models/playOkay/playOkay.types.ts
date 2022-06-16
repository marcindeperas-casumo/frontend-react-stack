import { TPeriodSelection } from "./config";
import { DepositLimitsReduxStore } from "./dgojDepositLimits";
import { TLimitType } from "./limits";

export type TPeriod =
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Indefinite"
  | "LoginBlockStart"
  | "LoginBlockEnd";

export type GetAllLimitsProps = {
  playerId: string;
};

export type SetDepositLimitProps = {
  playerId: string;
  limit: number;
  periodSetting: TPeriod;
};

export type PlayOkayReduxStore = {
  moneyLimits?: Array<any>;
  isDepositLimitProperlySet: boolean;
};

export type PlayOkayRootReduxStore = {
  depositLimits: DepositLimitsReduxStore;
  playOkay: PlayOkayReduxStore;
};

/* eslint-disable no-unused-vars */
export type TPlayOkaySettingsTranslations = {
  [title in `title_${Lowercase<TLimitType>}`]: string;
} & {
  [subtitle in `subtitle_${Lowercase<TLimitType>}`]: string;
} & {
  [period in `period_${Lowercase<TPeriod>}`]: string;
} & {
  /**
   * placeholders: amount
   */
  [available_amount in `available_amount_${Lowercase<TPeriod>}`]: string;
} & {
  /**
   * placeholders: period, amount, date
   */
  coming_limit_note: string;
  /**
   * placeholders: date
   */
  coming_revocation_note: string;
  cancel_coming_change: string;
  data_not_loaded_error: string;
} & {
  /**
   * placeholders: period
   */
  form_outro_copy_decreasing: string;
  /**
   * placeholders: period, date
   */
  form_outro_copy_increasing: string;
  form_outro_copy_initial: string;
  /**
   * placeholders: period, date
   */
  form_outro_copy_revoking: string;
  form_outro_cta: string;
} & {
  form_input_placeholder: string;
  form_allow_single_period_copy: string;
  form_error_request_failed: string;
} & {
  [form_input_helper in `form_input_helper_${Lowercase<TPeriod>}`]: string;
} & {
  [form_input_helper_hours in `form_input_helper_hours_${Lowercase<TPeriod>}`]: string;
} & {
  [form_validator in `form_validator_${Exclude<
    TPeriodSelection,
    Array<TPeriod>
  >}_required`];
} & {
  form_validator_period_too_low: string;
  form_validator_period_too_high: string;
};
/* eslint-enable no-unused-vars */

export type TPlayOkaySuspendAccountTranslations = {
  main_title: string;
  main_description: string;
  main_form_title: string;
  marketing_closure_button: string;
  marketing_closure_description: string;
  non_marketing_closure_button: string;
  non_marketing_closure_description: string;
  button_cancel: string;
  button_confirm: string;
  choose_period_button: string;
};

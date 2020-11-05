// @flow
import * as React from "react";
import type { DepositRequestStateType } from "Models/payments/payments.types";
export type QuickDepositSlipFormErrorTranslations = {
  error_deposit_minimum: ?string,
  error_deposit_maximum: ?string,
  error_deposit_amount_required: ?string,
  error_cvv_required: ?string,
  error_cvv_too_short: ?string,
  error_cvv_not_integer: ?string,
};

export type QuickDepositSlipTranslations = {
  deposit_amount: ?string,
  deposit_cta_text: ?string,
  deposit_helper_text: ?string,
  cvv_helper_text: ?string,
} & QuickDepositSlipFormErrorTranslations;

export type QuickDepositSlipForm = {
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
};

export type QuickDepositSlipFormErrors = {
  amountInput?: string,
  cvv?: string,
};

export type QuickDepositSlipFormProps = QuickDepositSlipForm & {
  translations: QuickDepositSlipFormErrorTranslations,
};

export type QuickDepositSlipProps = {
  currencySymbol: string,
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
  requestStatus: DepositRequestStateType,
  onDeposit: (depositValue: number, cvvValue: string) => void,
  renderPaymentMethodDetails: () => React.Node,
  translations: QuickDepositSlipTranslations,
};

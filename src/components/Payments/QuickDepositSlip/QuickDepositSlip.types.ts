import * as React from "react";
import type { DepositRequestStateType } from "Models/payments/payments.types";
export type QuickDepositSlipFormErrorTranslations = {
  error_deposit_minimum: string | undefined;
  error_deposit_maximum: string | undefined;
  error_deposit_amount_required: string | undefined;
  error_cvv_required: string | undefined;
  error_cvv_too_short: string | undefined;
  error_cvv_not_integer: string | undefined;
};

export type QuickDepositSlipTranslations = {
  deposit_amount: string | undefined;
  deposit_cta_text: string | undefined;
  deposit_helper_text: string | undefined;
  cvv_helper_text: string | undefined;
} & QuickDepositSlipFormErrorTranslations;

export type QuickDepositSlipForm = {
  minAmount: number;
  maxAmount: number;
  presetAmount?: number;
};

export type QuickDepositSlipFormErrors = {
  amountInput?: string;
  cvv?: string;
};

export type QuickDepositSlipFormProps = QuickDepositSlipForm & {
  translations: QuickDepositSlipFormErrorTranslations;
};

export type QuickDepositSlipProps = {
  currencySymbol: string;
  minAmount: number;
  maxAmount: number;
  presetAmount?: number;
  requestStatus: DepositRequestStateType;
  onDeposit: (depositValue: number, cvvValue: string) => void;
  renderPaymentMethodDetails: () => React.ReactNode;
  translations: QuickDepositSlipTranslations;
};

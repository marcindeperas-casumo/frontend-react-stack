// @flow
import * as React from "react";
import type { DepositRequestStateType } from "Models/payments/payments.types";
export type QuickDepositSlipFormErrorTranslations = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_deposit_minimum: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_deposit_maximum: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_deposit_amount_required: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_cvv_required: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_cvv_too_short: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  error_cvv_not_integer: ?string,
};

export type QuickDepositSlipTranslations = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  deposit_amount: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  deposit_cta_text: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  deposit_helper_text: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  renderPaymentMethodDetails: () => React.Node,
  translations: QuickDepositSlipTranslations,
};

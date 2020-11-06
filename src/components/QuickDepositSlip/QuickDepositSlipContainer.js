// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { playerCurrencySymbolSelector } from "Models/player";
import type { DepositRequestStateType } from "Models/payments/payments.types";
import { useTranslationsGql } from "../../utils/hooks/useTranslationsGql";
import { QuickDepositSlip } from "./QuickDepositSlip";

type Props = {
  minAmount: number,
  maxAmount: number,
  presetAmount?: number,
  requestStatus: DepositRequestStateType,
  onDeposit: (amount: number, cvvEncoded: string) => void,
  paymentMethodDetails: () => React.Node,
};

const cmsPrefix = "root:quick-deposit-slip:fields";

export function QuickDepositSlipContainer({
  minAmount,
  maxAmount,
  presetAmount,
  requestStatus,
  onDeposit,
  paymentMethodDetails,
}: Props) {
  const currencySymbol = useSelector(playerCurrencySymbolSelector);

  const { t, loading } = useTranslationsGql({
    deposit_amount: `${cmsPrefix}.deposit_amount`,
    deposit_cta_text: `${cmsPrefix}.deposit_cta_text`,
    deposit_helper_text: `${cmsPrefix}.deposit_helper_text`,
    cvv_helper_text: `${cmsPrefix}.cvv_helper_text`,
    error_deposit_minimum: `${cmsPrefix}.error_deposit_minimum`,
    error_deposit_maximum: `${cmsPrefix}.error_deposit_maximum`,
    error_deposit_amount_required: `${cmsPrefix}.error_deposit_amount_required`,
    error_cvv_required: `${cmsPrefix}.error_cvv_required`,
    error_cvv_too_short: `${cmsPrefix}.error_cvv_too_short`,
    error_cvv_not_integer: `${cmsPrefix}.error_cvv_not_integer`,
  });

  if (loading) {
    return null;
  }

  return (
    <QuickDepositSlip
      translations={t}
      currencySymbol={currencySymbol}
      minAmount={minAmount}
      maxAmount={maxAmount}
      requestStatus={requestStatus}
      onDeposit={onDeposit}
      renderPaymentMethodDetails={paymentMethodDetails}
    />
  );
}

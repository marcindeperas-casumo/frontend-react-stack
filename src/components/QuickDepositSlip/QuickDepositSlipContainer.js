// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { playerCurrencySymbolSelector } from "Models/player";
import { PaymentMethodDetails } from "../PaymentMethodDetails/PaymentMethodDetails";
import paymentMethodData from "../PaymentMethodDetails/__mocks__/cms";
import { useTranslationsGql } from "../../utils/hooks/__mocks__/useTranslationsGql";
import { QuickDepositSlip } from "./QuickDepositSlip";

const cmsPrefix = "root:quick-deposit-slip:fields";

export function QuickDepositSlipContainer() {
  const currencySymbol = useSelector(playerCurrencySymbolSelector);

  const { t } = useTranslationsGql({
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

  return (
    <QuickDepositSlip
      translations={t}
      currencySymbol={currencySymbol}
      minAmount={20}
      maxAmount={100}
      onDeposit={() => {}}
      renderPaymentMethodDetails={() => (
        <PaymentMethodDetails {...paymentMethodData} />
      )}
    />
  );
}

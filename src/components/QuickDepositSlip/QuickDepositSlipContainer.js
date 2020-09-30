// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { playerCurrencySymbolSelector } from "Models/player";
import { PaymentMethodDetails } from "../PaymentMethodDetails/PaymentMethodDetails";
import paymentMethodData from "../PaymentMethodDetails/__mocks__/cms";
import { QuickDepositSlip } from "./QuickDepositSlip";
import { translations } from "./__mocks__/cms";

export function QuickDepositSlipContainer() {
  const currencySymbol = useSelector(playerCurrencySymbolSelector);

  return (
    <QuickDepositSlip
      translations={translations}
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

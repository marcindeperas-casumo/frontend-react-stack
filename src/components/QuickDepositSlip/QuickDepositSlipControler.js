import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import { CloseIcon } from "@casumo/cmp-icons";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { QuickDepositSlip } from "Components/QuickDepositSlip";
import { playerCurrencySymbolSelector } from "Models/player";
import { PaymentMethodDetails } from "Components/PaymentMethodDetails";
import { getSelectedQuickDepositMethod } from "Models/payments/payments.selectors";

export const QuickDepositSlipControler = () => {
  const selectedMethod = useSelector(getSelectedQuickDepositMethod);
  const currency = useSelector(playerCurrencySymbolSelector);
  const dispatch = useDispatch();

  if (!selectedMethod) {
    return null;
  }

  const { min, max } = selectedMethod?.limits?.deposit;

  const onDeposit = () => {};

  const closeQuickDeposit = () => {
    dispatch(setQuickDepositMethod(null));
  };

  const t = {
    deposit_amount: "amount",
    deposit_cta_text: "deposit",
    deposit_helper_text: "please deposit",
    cvv_helper_text: "here's cvv",
    error_deposit_minimum: "oooh not enough, need to put more",
    error_deposit_maximum: "u greedy, too much bro",
    error_cvv_required: "cvv required",
    error_cvv_too_short: "cvv too short",
    error_cvv_not_integer: "cvv not an integer",
  };

  return (
    selectedMethod && (
      <div className="t-border-r-top-left--md t-border-r-top-right--md u-padding--md t-background-white o-inset-left--none o-inset-bottom--none o-position--fixed ">
        <Flex
          className="u-margin-bottom--md"
          justify="space-between"
          direction="horizontal"
          align="center"
        >
          <Flex.Item>Quick deposit</Flex.Item>
          <Flex.Item onClick={closeQuickDeposit}>
            <CloseIcon />
          </Flex.Item>
        </Flex>
        <QuickDepositSlip
          minAmount={min}
          maxAmount={max}
          t={t}
          onDesposit={onDeposit}
          paymentMethodDetails={() => (
            <PaymentMethodDetails method={selectedMethod} />
          )}
          currencySymbol={currency}
        />
      </div>
    )
  );
};

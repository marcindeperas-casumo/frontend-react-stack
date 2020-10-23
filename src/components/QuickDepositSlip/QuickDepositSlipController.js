// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import { CloseIcon } from "@casumo/cmp-icons";
import {
  setQuickDepositMethod,
  startQuickDeposit,
} from "Models/payments/payments.actions";
import { QuickDepositSlip } from "Components/QuickDepositSlip";
import { useTranslationsGql } from "Utils/hooks";
import { playerCurrencySymbolSelector } from "Models/player";
import { PaymentMethodDetails } from "Components/PaymentMethodDetails";
import {
  getSelectedQuickDepositMethod,
  getPaymentRequestSelector,
} from "Models/payments/payments.selectors";

export const QuickDepositSlipController = () => {
  const selectedMethod = useSelector(getSelectedQuickDepositMethod);
  const currency = useSelector(playerCurrencySymbolSelector);
  const paymentRequest = useSelector(getPaymentRequestSelector);

  const { t } = useTranslationsGql({
    quick_deposit_slip_title: `iframe-solution.in_game_drawer_live_chat`,
  });

  const dispatch = useDispatch();

  if (!selectedMethod) {
    return null;
  }

  const { min, max } = selectedMethod?.limits?.deposit;

  const onDeposit = (amount: number, cvvEncoded: string) => {
    dispatch(
      startQuickDeposit({ amount, cvvEncoded, paymentMethod: selectedMethod })
    );
  };

  const closeQuickDeposit = () => {
    dispatch(setQuickDepositMethod(null));
  };

  // const requestError = paymentRequest.message?.code;
  // react on request error if it's in the state

  return (
    <div
      className="
      u-width--screen
      t-border-r-top-left--md
      t-border-r-top-right--md
      t-background-white
      o-inset-left--none
      o-inset-bottom--none
      o-position--fixed
      "
    >
      <div className="u-padding--md">
        <Flex
          className="u-margin-bottom--md"
          justify="space-between"
          direction="horizontal"
          align="center"
        >
          <Flex.Item>{t && t.quick_deposit_slip_title}</Flex.Item>
          <Flex.Item onClick={closeQuickDeposit}>
            <CloseIcon />
          </Flex.Item>
        </Flex>
        <QuickDepositSlip
          minAmount={min}
          maxAmount={max}
          onDeposit={onDeposit}
          requestStatus={paymentRequest}
          paymentMethodDetails={() => (
            <PaymentMethodDetails method={selectedMethod} />
          )}
          currencySymbol={currency}
        />
      </div>
    </div>
  );
};

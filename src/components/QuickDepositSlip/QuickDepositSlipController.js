// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import { CloseIcon } from "@casumo/cmp-icons";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { QuickDepositSlip } from "Components/QuickDepositSlip";
import { useTranslationsGql } from "Utils/hooks";
import { playerCurrencySymbolSelector } from "Models/player";
import { PaymentMethodDetails } from "Components/PaymentMethodDetails";
import { getSelectedQuickDepositMethod } from "Models/payments/payments.selectors";

export const QuickDepositSlipController = () => {
  const selectedMethod = useSelector(getSelectedQuickDepositMethod);
  const currency = useSelector(playerCurrencySymbolSelector);
  const { t } = useTranslationsGql({
    quick_deposit_slip_title: `iframe-solution.in_game_drawer_live_chat`,
  });
  const dispatch = useDispatch();

  if (!selectedMethod) {
    return null;
  }

  const { min, max } = selectedMethod?.limits?.deposit;

  const onDeposit = (amount, encodedCvv) => {
    //@lukKowalski, dispatching temporarily, will be replaced with a proper action
    dispatch({ type: "make_deposit", amount, encodedCvv });
  };

  const closeQuickDeposit = () => {
    dispatch(setQuickDepositMethod(null));
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
          <Flex.Item>{t && t.quick_deposit_slip_title}</Flex.Item>
          <Flex.Item onClick={closeQuickDeposit}>
            <CloseIcon />
          </Flex.Item>
        </Flex>
        <QuickDepositSlip
          minAmount={min}
          maxAmount={max}
          onDeposit={onDeposit}
          paymentMethodDetails={() => (
            <PaymentMethodDetails method={selectedMethod} />
          )}
          currencySymbol={currency}
        />
      </div>
    )
  );
};

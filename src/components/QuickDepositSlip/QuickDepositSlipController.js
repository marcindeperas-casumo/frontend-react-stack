// @flow
import React from "react";
import classNames from "classnames";
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

export const QuickDepositSlipController = ({ position }) => {
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

  const borderClasses = () =>
    position === "top"
      ? [
          "t-border-r-top-left--md",
          "t-border-r-top-right--md",
          "t-border-r-bottom-left--md",
          "t-border-r-bottom-right--md",
        ]
      : ["t-border-r-top-left--md", "t-border-r-top-right--md"];

  return (
    <Flex
      align="center"
      justify="center"
      className="u-width--screen o-position--fixed c-deposit-slip-container"
    >
      <Flex.Item
        className="
          c-slip-desktop-width
          u-width--screen@mobile
          u-width--4/5@phablet
          u-width--3/5@tablet
          o-position--relative"
      >
        <div
          className={classNames(borderClasses(), [
            "u-width--full",
            "t-background-white",
            "o-inset-left--none@mobile",
            "o-inset-left--none@phablet",
            "o-inset-left--none@tablet",
            "o-inset-bottom--none@mobile",
            "o-inset-bottom--none@phablet",
            "o-inset-bottom--none@tablet",
            "o-inset-top--none@desktop",
            "o-position--absolute",
          ])}
        >
          <div className="u-padding--md">
            <Flex
              className="u-margin-bottom--md"
              justify="space-between"
              direction="horizontal"
              align="center"
            >
              <Flex.Item>{t && t.quick_deposit_slip_title}</Flex.Item>
              <Flex.Item onClick={closeQuickDeposit} className="t-color-black">
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
      </Flex.Item>
    </Flex>
  );
};

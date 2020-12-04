// @flow
import React from "react";
import cx from "classnames";
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

const cmsPrefix = "root:iframe-solution:fields";

export const QuickDepositSlipController = ({
  position,
}: {
  position: "top" | "bottom",
}) => {
  const selectedMethod = useSelector(getSelectedQuickDepositMethod);
  const currency = useSelector(playerCurrencySymbolSelector);
  const paymentRequest = useSelector(getPaymentRequestSelector);

  const { t, loading: tLoading } = useTranslationsGql({
    quick_deposit_title: `${cmsPrefix}.quick_deposit_title`,
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
      className={cx(
        "u-width--screen o-position--absolute u-pointer--none c-deposit-slip-container",
        {
          "o-inset-top--none": position === "top",
          "o-inset-bottom--none": position === "bottom",
        }
      )}
    >
      <Flex.Item
        className={cx([
          "c-quick-deposit-slip-positioning",
          "u-width--screen@mobile",
          "u-width--4/5@phablet",
          "u-width--3/5@tablet",
          "o-position--relative",
          "u-pointer--initial",
        ])}
      >
        <div className={cx(borderClasses(), ["t-background-white"])}>
          <div className="u-padding--md">
            <Flex
              className="u-margin-bottom--md"
              justify="space-between"
              direction="horizontal"
              align="center"
            >
              <Flex.Item>{!tLoading && t.quick_deposit_title}</Flex.Item>
              <Flex.Item
                onClick={closeQuickDeposit}
                className="t-color-black u-cursor--pointer"
              >
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

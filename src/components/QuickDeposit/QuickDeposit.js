// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { AddIcon } from "@casumo/cmp-icons";
import { CurrencyIcon } from "Components/CurrencyIcon/CurrencyIcon";
import "./QuickDeposit.scss";
import type { QuickDepositMethod } from "Models/payments";

type Props = {
  quickDepositPaymentMethods: Array<QuickDepositMethod>,
  walletBalance: string,
  bonusBalance: string,
  currency: string,
  t?: {
    bonus_title: ?string,
    balance_title: ?string,
    cashier_link_text: ?string,
  },
  cashierLinkCallback: () => null,
};

export const QuickDeposit = ({
  quickDepositPaymentMethods,
  walletBalance,
  bonusBalance,
  currency,
  t,
  cashierLinkCallback = () => null,
}: Props) => {
  if (!t) {
    return null;
  }

  return (
    <Flex
      className="t-background-grey-90 t-border-r u-padding-left--xlg u-padding-right--md u-padding-y"
      align="center"
    >
      <Flex.Item className="u-margin-right--xlg">
        <Text tag="div" className="t-color-grey-20" size="sm">
          {t.balance_title}
        </Text>
        <Text tag="div" className="t-color-white u-font-weight-bold">
          {walletBalance}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="div" className="t-color-grey-20" size="sm">
          {t.bonus_title}
        </Text>
        <Text tag="div" className="t-color-grey-20 u-font-weight-bold">
          {bonusBalance}
        </Text>
      </Flex.Item>
      <Flex.Block className="o-flex-justify--end">
        {quickDepositPaymentMethods.length ? (
          <Flex
            align="center"
            justify="center"
            className="c-quick-deposit-icon-wrapper t-background-white t-border-r--circle u-position-relative u-width--2xlg u-height--2xlg u-cursor--pointer"
          >
            <CurrencyIcon
              currency={currency}
              selected
              classList="u-position--absolute o-inset-x--none t-color-purple-60"
            />
            <div className="c-quick-deposit-add-icon t-border-purple-60 t-border t-border-r--circle t-background-white u-position-absolute">
              <AddIcon className="t-color-purple-60" size="md" />
            </div>
          </Flex>
        ) : (
          <Text
            tag="span"
            className="t-color-grey-20 u-font-weight-bold u-text-decoration-underline u-cursor--pointer"
            onClick={cashierLinkCallback}
          >
            {t.cashier_link_text}
          </Text>
        )}
      </Flex.Block>
    </Flex>
  );
};

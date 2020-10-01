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
  const svgCurrencyIconClassList =
    "c-quick-deposit-wallet-icon u-position--absolute o-inset-x--none t-color-purple-60";

  if (!t) {
    return null;
  }

  return (
    <Flex
      align="stretch"
      justify="space-around"
      className="t-background-grey-90 t-border-r u-height--5xlg u-margin u-margin-x--auto@tablet u-margin-bottom--none u-padding--md"
    >
      <Flex.Item>
        <Flex.Block>
          <span>{t.balance_title}</span>
        </Flex.Block>
        <Flex.Block>
          <span className="u-font-weight-bold">{walletBalance}</span>
        </Flex.Block>
      </Flex.Item>
      <Flex.Item>
        <Flex.Block>
          <span>{t.bonus_title}</span>
        </Flex.Block>
        <Flex.Block>
          <span className="u-font-weight-bold">{bonusBalance}</span>
        </Flex.Block>
      </Flex.Item>
      <Flex.Item className="u-margin-left--auto u-cursor--pointer">
        {quickDepositPaymentMethods.length ? (
          <Flex
            align="center"
            justify="center"
            className="c-quick-deposit-icon-wrapper t-background-white t-border-r--circle u-position-relative u-width--2xlg u-height--2xlg"
          >
            <CurrencyIcon
              currency={currency}
              selected
              classList={svgCurrencyIconClassList}
            />
            <div className="c-quick-deposit-add-icon t-border-purple-60 t-border t-border-r--circle t-background-white u-position-absolute u-scale-x--25 u-scale-y--25">
              <AddIcon className="t-color-purple-60" size="md" />
            </div>
          </Flex>
        ) : (
          <Text
            tag="span"
            className="u-padding-top u-display--block u-font-weight-bold u-text-decoration-underline"
            onClick={cashierLinkCallback}
          >
            {t.cashier_link_text}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  );
};

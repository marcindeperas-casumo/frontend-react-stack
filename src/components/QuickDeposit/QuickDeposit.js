// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { AddIcon, WalletTabEuroSelectedIcon } from "@casumo/cmp-icons";
import "./QuickDeposit.scss";

type Props = {
  savedPaymentMethods: Boolean,
  walletBalance: String,
  bonusBalance: String,
  t: {
    balance_title: string,
    bonus_title: string,
    cashier_link_text: String,
  },
};

export const QuickDeposit = ({
  savedPaymentMethods,
  walletBalance,
  bonusBalance,
  t,
}: Props) => {
  return (
    <Flex
      className="u-height--5xlg u-padding-top--md u-padding-left--xlg u-padding-right--xlg t-background-grey-90 t-border-r-top-left t-border-r-top-right t-color-white u-font"
      direction="horizontal"
      spacing="md"
    >
      {/* <Flex.Item>
        <Flex.Block>
          <Text>{t.balance_title}</Text>
        </Flex.Block>
        <Flex.Block>
          <Text className="u-font-weight-bold">{walletBalance}</Text>
        </Flex.Block>
      </Flex.Item>
      <Flex.Item>
        <Flex.Block>
          <Text>{t.bonus_title}</Text>
        </Flex.Block>
        <Flex.Block>
          <Text className="u-font-weight-bold">{bonusBalance}</Text>
        </Flex.Block>
      </Flex.Item> */}
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
        {savedPaymentMethods ? (
          <div className="c-quick-deposit-icon-wrapper t-background-white t-border-r--circle o-position--relative u-width--2xlg u-height--2xlg">
            <WalletTabEuroSelectedIcon className="c-quick-deposit-wallet-icon o-position--absolute o-inset-x--none " />
            <div className="c-quick-deposit-add-icon t-border-purple-60 t-border t-border-r--circle t-background-white o-position--absolute">
              <AddIcon />
            </div>
          </div>
        ) : (
          <a className="u-padding-top u-display--block u-font-weight-bold u-text-decoration-underline">
            {t.cashier_link_text}
          </a>
        )}
      </Flex.Item>
    </Flex>
  );
};

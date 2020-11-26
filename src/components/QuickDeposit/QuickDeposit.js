// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { AddIcon } from "@casumo/cmp-icons";
import TrackClick from "Components/TrackClick";
import { EVENTS } from "Src/constants";
import { CurrencyIcon } from "Components/CurrencyIcon/CurrencyIcon";
import "./QuickDeposit.scss";

export type QuickDepositTranslations = {
  bonus_title: ?string,
  balance_title: ?string,
  cashier_link_text: ?string,
};

export type QuickDepositProps = {
  hasSavedPaymentMethods: boolean,
  walletBalance: string,
  bonusBalance: string,
  currency: string,
  className?: string,
  onCashierLinkClick: () => void,
  onQuickDepositLinkClick: () => void,
};

type Props = QuickDepositProps & {
  t?: QuickDepositTranslations,
};

export const QuickDeposit = ({
  hasSavedPaymentMethods,
  walletBalance,
  bonusBalance,
  currency,
  t,
  className = "",
  onCashierLinkClick,
  onQuickDepositLinkClick,
}: Props) => {
  if (!t) {
    return null;
  }

  return (
    <Flex className={className} align="center">
      <Flex.Item className="u-margin-right--xlg">
        <Text tag="div" className="t-color-grey-20" size="xs">
          {t.balance_title}
        </Text>
        <Text tag="div" className="t-color-white u-font-weight-bold">
          {walletBalance}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="div" className="t-color-grey-20" size="xs">
          {t.bonus_title}
        </Text>
        <Text tag="div" className="t-color-grey-20 u-font-weight-bold">
          {bonusBalance}
        </Text>
      </Flex.Item>
      <Flex.Block className="o-flex-justify--end u-margin-left--xlg">
        {hasSavedPaymentMethods ? (
          <Flex
            align="center"
            justify="center"
            className="t-background-white t-border-r--circle u-position-relative u-width--2xlg u-height--2xlg u-cursor--pointer"
            onClick={onQuickDepositLinkClick}
          >
            <TrackClick
              eventName={EVENTS.MIXPANEL_QUICK_DEPOSIT_CURRENCY_SIGN_CLICKED}
            >
              <CurrencyIcon
                currency={currency}
                selected
                classList="u-position--absolute o-inset-x--none t-color-purple-60"
              />
              <div className="c-quick-deposit-add-icon t-border-purple-60 t-border t-border-r--circle t-background-white u-position-absolute">
                <AddIcon className="t-color-purple-60" size="md" />
              </div>
            </TrackClick>
          </Flex>
        ) : (
          <TrackClick eventName={EVENTS.MIXPANEL_CASHIER_LINK_CLICKED}>
            <Text
              tag="span"
              className="t-color-grey-20 u-font-weight-bold u-text-decoration-underline u-cursor--pointer u-margin-right"
              onClick={onCashierLinkClick}
            >
              {t.cashier_link_text}
            </Text>
          </TrackClick>
        )}
      </Flex.Block>
    </Flex>
  );
};

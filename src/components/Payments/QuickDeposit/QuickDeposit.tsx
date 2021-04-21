import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { AddIcon } from "@casumo/cmp-icons";
import React from "react";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";
import { CurrencyIcon } from "Components/CurrencyIcon/CurrencyIcon";
import type { TCurrencyCode } from "Src/constants";
import "./QuickDeposit.scss";

export type QuickDepositTranslations = {
  bonus_title: string | undefined;
  balance_title: string | undefined;
  cashier_link_text: string | undefined;
};

export type QuickDepositProps = {
  hasSavedPaymentMethods: boolean;
  walletBalance: string;
  bonusBalance: string;
  currency: TCurrencyCode;
  className?: string;
  onCashierLinkClick: () => void;
  onQuickDepositLinkClick: () => void;
};

type Props = QuickDepositProps & {
  t?: QuickDepositTranslations;
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
  const cashierLinkClickHandler = () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_CURRENCY_SIGN_CLICKED);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_STARTED);
    onCashierLinkClick();
  };

  const currencySymbolClickHandler = () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tracker.track(EVENTS.MIXPANEL_CASHIER_LINK_CLICKED);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_PROCESS_INITIATED);
    onQuickDepositLinkClick();
  };

  return (
    <Flex className={className} align="center">
      <Flex.Item className="u-margin-right--xlg">
        <Text tag="div" className="text-grey-20" size="xs">
          {t.balance_title}
        </Text>
        <Text tag="div" className="text-white u-font-weight-bold">
          {walletBalance}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="div" className="text-grey-20" size="xs">
          {t.bonus_title}
        </Text>
        <Text tag="div" className="text-grey-20 u-font-weight-bold">
          {bonusBalance}
        </Text>
      </Flex.Item>
      <Flex.Block className="o-flex-justify--end u-margin-left--xlg">
        {hasSavedPaymentMethods ? (
          <Flex
            align="center"
            justify="center"
            className="bg-white bg-opacity-100 t-border-r--circle o-position--relative u-width--2xlg u-height--2xlg u-cursor--pointer"
            onClick={currencySymbolClickHandler}
          >
            <CurrencyIcon
              currency={currency}
              selected
              classList="u-position--absolute o-inset-x--none text-purple-60"
            />
            <div className="c-quick-deposit-add-icon t-border-purple-60 t-border t-border-r--circle bg-white o-position--absolute">
              <AddIcon className="text-purple-60" size="md" />
            </div>
          </Flex>
        ) : (
          <Text
            tag="span"
            className="text-grey-20 u-font-weight-bold u-text-decoration-underline u-cursor--pointer u-margin-right"
            onClick={cashierLinkClickHandler}
          >
            {t.cashier_link_text}
          </Text>
        )}
      </Flex.Block>
    </Flex>
  );
};

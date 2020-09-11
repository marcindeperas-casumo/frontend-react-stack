// @flow
import React from "react";
import { useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { AddIcon } from "@casumo/cmp-icons";
import { CurrencyIcon } from "Components/CurrencyIcon/CurrencyIcon";
import { REACT_APP_MODAL } from "Src/constants";
import { showModal } from "Models/modal";
import "./QuickDeposit.scss";

type Props = {
  hasSavedPaymentMethods: boolean,
  walletBalance: string,
  bonusBalance: string,
  currency: string,
  t?: {
    bonus_title: ?string,
    balance_title: ?string,
    cashier_link_text: ?string,
  },
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
};

export const QuickDeposit = ({
  hasSavedPaymentMethods,
  walletBalance,
  bonusBalance,
  currency,
  t,
  pauseGame,
  resumeGame,
}: Props) => {
  const svgCurrencyIconClassList =
    "c-quick-deposit-wallet-icon u-position--absolute o-inset-x--none t-color-purple-60";

  const dispatch = useDispatch();
  const modalConfig = { onCloseCallback: resumeGame };

  const cashierLinkClick = () => {
    pauseGame();
    dispatch(showModal(REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION, modalConfig));
  };

  if (!t) {
    return null;
  }
  return (
    <Flex
      className="u-height--5xlg u-padding-top--md u-padding-x--xlg t-background-grey-90 t-color-white u-font"
      direction="horizontal"
      spacing="md"
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
        {hasSavedPaymentMethods ? (
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
            onClick={cashierLinkClick}
          >
            {t.cashier_link_text}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  );
};

// @flow
import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { AddIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import {
  playerBalanceAmountSelector,
  playerCurrencySelector,
  playerWalletBonusSelector,
} from "Models/player";
import { formatCurrency } from "Utils";
import { useLocale, useTranslations } from "Utils/hooks";
import { navigateById } from "Services/NavigationService";

import "./BalanceBetSlip.scss";

type Props = {
  maximized: boolean,
};

export const BalanceBetSlip = ({ maximized = false }: Props) => {
  const locale = useLocale();
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const bonusBalance = useSelector(playerWalletBonusSelector);

  const t = useTranslations("iframe-solution");

  return (
    <Flex
      align="center"
      className={cx(
        "c-sports-balance-bet-slip o-position--fixed u-zindex--content-overlay u-width--full t-color-white u-padding u-overflow--hidden u-height--3xlg",
        maximized && "c-sports-balance-bet-slip--maximized o-inset-bottom--none"
      )}
    >
      <Flex.Item
        onClick={() => navigateById({ routeId: "deposit" })}
        className="o-flex u-padding t-border-r--circle t-background-purple-80"
      >
        <AddIcon size="sm" />
      </Flex.Item>
      <Flex direction="vertical" className="u-padding-x--md">
        <Text tag="div" size="xs">
          {t?.balance_title}
        </Text>
        <Text tag="div" className="u-font-weight-bold">
          {formatCurrency({
            locale,
            currency,
            value: playerBalance,
          })}
        </Text>
      </Flex>
      {bonusBalance !== 0 && (
        <Flex direction="vertical">
          <Text tag="div" size="xs">
            {t?.bonus_title}
          </Text>
          <Text tag="div" className="u-font-weight-bold">
            {formatCurrency({
              locale,
              currency,
              value: bonusBalance,
            })}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

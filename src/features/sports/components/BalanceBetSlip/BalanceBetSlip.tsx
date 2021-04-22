import { AddIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import cx from "classnames";
import React from "react";

import "./BalanceBetSlip.scss";

type Props = {
  t:
    | {
        balance_title: string;
        bonus_title: string;
      }
    | undefined;
  maximized: boolean;
  balance: string;
  bonus?: string;
  goToDeposit?: () => void;
};

export const BalanceBetSlip = ({
  t,
  maximized,
  balance,
  bonus,
  goToDeposit = () => {},
}: Props) => (
  <Flex
    align="center"
    className={cx(
      "c-sports-balance-bet-slip o-position--fixed u-zindex--content-overlay u-width--full text-white u-padding u-overflow--hidden u-height--3xlg bg-purple-100",
      maximized && "c-sports-balance-bet-slip--maximized o-inset-bottom--none"
    )}
  >
    <Flex.Item
      onClick={goToDeposit}
      className="o-flex u-padding t-border-r--circle bg-purple-80"
    >
      <AddIcon size="sm" />
    </Flex.Item>
    <Flex direction="vertical" className="u-padding-x--md">
      <Text tag="div" size="xs">
        {t?.balance_title}
      </Text>
      <Text tag="div" className="u-font-weight-bold">
        {balance}
      </Text>
    </Flex>
    {bonus && (
      <Flex direction="vertical">
        <Text tag="div" size="xs">
          {t?.bonus_title}
        </Text>
        <Text tag="div" className="u-font-weight-bold">
          {bonus}
        </Text>
      </Flex>
    )}
  </Flex>
);

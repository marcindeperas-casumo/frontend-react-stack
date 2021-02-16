// @flow
import React from "react";
import type { Element } from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import { Panel } from "Components/Panel";
import Icon from "./icon.svg";

type Props = {
  balance: number,
  firstDeposit: boolean,
  BalanceLabelElement: () => Element<*>,
  FirstDepositElement: () => Element<*>,
  FirstDepositDescElement: () => Element<*>,
  BalanceElement: () => Element<*>,
  BonusElement: () => Element<*>,
  DepositLabelElement: () => Element<*>,
  WithdrawLabelElement: () => Element<*>,
};

const WalletCard = React.memo<Props>((props: Props) => {
  const {
    firstDeposit,
    balance,
    FirstDepositElement,
    FirstDepositDescElement,
    BalanceLabelElement,
    BonusElement,
    BalanceElement,
    DepositLabelElement,
    WithdrawLabelElement,
  } = props;

  return (
    <Panel roundedTop roundedBottom>
      <Icon className="u-width--3xlg u-margin-y--md u-margin-x" />
      {firstDeposit ? (
        <>
          <FirstDepositElement />
          <FirstDepositDescElement />
        </>
      ) : (
        <>
          <BalanceLabelElement />
          <BalanceElement />
          <BonusElement />
        </>
      )}

      <ButtonPrimary size="md" className="u-padding-x--3xlg u-margin-right">
        <DepositLabelElement />
      </ButtonPrimary>

      {!firstDeposit && (
        <ButtonPrimary
          size="md"
          className="u-padding-x--3xlg"
          isDisabled={!balance}
        >
          <WithdrawLabelElement />
        </ButtonPrimary>
      )}
    </Panel>
  );
});

export default WalletCard;

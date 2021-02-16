// @flow
import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import { Panel } from "Components/Panel";
import Icon from "./icon.svg";

type TProps = {
  balance: number,
  firstDeposit: boolean,
  BalanceHeader: () => React.Node | string,
  Balance: () => React.Node | string,
  FirstDepositHeader: () => React.Node | string,
  FirstDepositDesc: () => React.Node | string,
  Bonus: () => React.Node | string,
  DepositLabel: () => React.Node | string,
  WithdrawLabel: () => React.Node | string,
  onDeposit: () => any,
  onWithdraw: () => any,
};

export const WalletCard = React.memo<TProps>((props: TProps) => {
  const {
    firstDeposit,
    balance,
    FirstDepositHeader,
    FirstDepositDesc,
    BalanceHeader,
    Balance,
    Bonus,
    DepositLabel,
    WithdrawLabel,
    onDeposit,
    onWithdraw,
  } = props;

  return (
    <Panel roundedTop roundedBottom>
      <Icon className="u-width--3xlg u-margin-y--md u-margin-x" />
      {firstDeposit ? (
        <>
          <FirstDepositHeader />
          <FirstDepositDesc />
        </>
      ) : (
        <>
          <BalanceHeader />
          <Balance />
          <Bonus />
        </>
      )}

      <ButtonPrimary
        size="md"
        className="u-padding-x--3xlg u-margin-right"
        onClick={onDeposit}
      >
        <DepositLabel />
      </ButtonPrimary>

      {!firstDeposit && (
        <ButtonPrimary
          size="md"
          className="u-padding-x--3xlg"
          isDisabled={!balance}
          onClick={onWithdraw}
        >
          <WithdrawLabel />
        </ButtonPrimary>
      )}
    </Panel>
  );
});

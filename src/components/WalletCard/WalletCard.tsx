// @flow
import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import { Panel } from "Components/Panel";
import Icon from "./icon.svg";

type TProps = {
  balance: number,
  firstDeposit: boolean,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  BalanceHeader: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  Balance: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  FirstDepositHeader: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  FirstDepositDesc: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  Bonus: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  DepositLabel: () => React.Node | string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
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
    <Panel>
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

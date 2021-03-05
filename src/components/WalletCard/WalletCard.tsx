import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { Panel } from "Components/Panel";
import Icon from "./icon.svg";

type TProps = {
  balance: number;
  firstDeposit: boolean;
  BalanceHeader: () => React.ReactNode | string;
  Balance: () => React.ReactNode | string;
  FirstDepositHeader: () => React.ReactNode | string;
  FirstDepositDesc: () => React.ReactNode | string;
  Bonus: () => React.ReactNode | string;
  DepositLabel: () => React.ReactNode | string;
  WithdrawLabel: () => React.ReactNode | string;
  onDeposit: () => any;
  onWithdraw: () => any;
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
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'FirstDepositHeader' cannot be used as a JSX compo... Remove this comment to see the full error message */}
          <FirstDepositHeader />
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'FirstDepositDesc' cannot be used as a JSX compone... Remove this comment to see the full error message */}
          <FirstDepositDesc />
        </>
      ) : (
        <>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'BalanceHeader' cannot be used as a JSX component. */}
          <BalanceHeader />
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'Balance' cannot be used as a JSX component. */}
          <Balance />
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'Bonus' cannot be used as a JSX component. */}
          <Bonus />
        </>
      )}

      <ButtonPrimary
        size="md"
        className="u-padding-x--3xlg u-margin-right"
        onClick={onDeposit}
      >
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DepositLabel' cannot be used as a JSX component. */}
        <DepositLabel />
      </ButtonPrimary>

      {!firstDeposit && (
        <ButtonPrimary
          size="md"
          className="u-padding-x--3xlg"
          isDisabled={!balance}
          onClick={onWithdraw}
        >
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'WithdrawLabel' cannot be used as a JSX component. */}
          <WithdrawLabel />
        </ButtonPrimary>
      )}
    </Panel>
  );
});

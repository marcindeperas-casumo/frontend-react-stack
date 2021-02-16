// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Text from "@casumo/cmp-text";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import WalletCard from ".";

const stories = storiesOf("WalletCard", module);

stories.add("Default", () => {
  const props = {
    balance: 0,
    firstDeposit: false,
    FirstDepositElement: () => (
      <Text
        className="t-color-grey-90 u-font-weight-bold u-margin-bottom--none"
        size="xlg"
      >
        Make your first deposit
      </Text>
    ),
    FirstDepositDescElement: () => (
      <Text className="t-color-grey-50 u-font-weight-bold u-margin-top">
        Once you make your first deposit you'll be able to claim your welcome
        bonus.
      </Text>
    ),
    BalanceLabelElement: () => (
      <Text className="t-color-grey-50 u-font-weight-bold u-margin-bottom">
        Your balance
      </Text>
    ),
    BalanceElement: () => (
      <Text
        className="t-color-grey-90 u-font-weight-bold u-margin-bottom--none"
        size="xlg"
      >
        € 0,00
      </Text>
    ),
    BonusElement: () => (
      <Text className="t-color-grey-50 u-font-weight-bold u-margin-top">
        + € 0,00
      </Text>
    ),
    DepositLabelElement: () => <>Deposit</>,
    WithdrawLabelElement: () => <>Withdraw</>,
  };

  const propsLoading = {
    ...props,
    firstDeposit: false,
    BalanceLabelElement: () => <ParagraphSkeleton size="default" lines={3} />,
    BalanceElement: () => null,
    BonusElement: () => null,
    DepositLabelElement: () => null,
    WithdrawLabelElement: () => null,
  };

  return (
    <div className="t-background-grey-20 u-padding--lg">
      <h2>Basic usage:</h2>
      <WalletCard {...props} />

      <h2>First deposit:</h2>
      <WalletCard {...{ ...props, firstDeposit: true }} />

      <h2>Loading state:</h2>
      <WalletCard {...propsLoading} />
    </div>
  );
});

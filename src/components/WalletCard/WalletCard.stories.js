// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import WalletCard from ".";

const stories = storiesOf("WalletCard", module);

stories.add("Default", () => {
  const props = {
    translations: {},
    balance: 0,
  };

  return (
    <div className="t-background-grey-20 u-padding--lg">
      <h2>First deposit:</h2>
      <WalletCard {...{ ...props, firstDeposit: true }} />
      <hr />
      <h2>Basic usage:</h2>
      <WalletCard {...props} />
    </div>
  );
});

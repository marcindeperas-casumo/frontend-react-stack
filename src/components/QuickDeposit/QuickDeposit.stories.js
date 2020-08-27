// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { QuickDeposit } from "./QuickDeposit";

const stories = storiesOf("QuickDeposit", module);

const t = {
  balance_title: "Balance",
  bonus_title: "Bonus",
  cashier_link_text: "Cashier",
};

stories.add("DepositSlipLink", () => {
  return (
    <MockStore>
      <QuickDeposit
        walletBalance="£987.65"
        bonusBalance="£55.03"
        t={t}
        savedPaymentMethods
      />
    </MockStore>
  );
});

stories.add("CashierLink", () => {
  return (
    <MockStore>
      <QuickDeposit
        walletBalance="£987.65"
        bonusBalance="£55.03"
        t={t}
        savedPaymentMethods={false}
      />
    </MockStore>
  );
});

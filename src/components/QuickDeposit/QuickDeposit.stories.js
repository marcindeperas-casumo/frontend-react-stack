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

stories.add("Sterling Deposit Slip Link", () => {
  return (
    <MockStore>
      <QuickDeposit
        walletBalance="£987.65"
        bonusBalance="£55.03"
        t={t}
        hasSavedPaymentMethods={true}
        currency="GBP"
        cashierLinkCallback={() => null}
      />
    </MockStore>
  );
});

stories.add("Euro Cashier Link", () => {
  return (
    <MockStore>
      <QuickDeposit
        walletBalance="€987.65"
        bonusBalance="€55.03"
        t={t}
        currency="EUR"
        hasSavedPaymentMethods={false}
        cashierLinkCallback={() => null}
      />
    </MockStore>
  );
});

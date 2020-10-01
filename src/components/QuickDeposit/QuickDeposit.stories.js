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

const methodMock = {
  deleted: false,
  id: "some_id",
  identifier: "Visa",
  lastUsageTime: 0,
  name: "Visa card",
  token: "token",
  type: "VISA_CARD",
  limits: {
    deposit: {
      min: 10,
      max: 100,
    },
  },
  displayName: "Visa/debit",
};

stories.add("Sterling Deposit Slip Link", () => {
  return (
    <MockStore>
      <QuickDeposit
        walletBalance="£987.65"
        bonusBalance="£55.03"
        t={t}
        quickDepositPaymentMethods={[methodMock]}
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
        quickDepositPaymentMethods={[]}
        cashierLinkCallback={() => null}
      />
    </MockStore>
  );
});

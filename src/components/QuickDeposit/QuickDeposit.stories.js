// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { CURRENCIES } from "Src/constants";
import MockStore from "Components/MockStore";
import { QuickDeposit } from "./QuickDeposit";

const stories = storiesOf("QuickDeposit", module);

const t = {
  balance_title: "Balance",
  bonus_title: "Bonus",
  cashier_link_text: "Cashier",
};

stories.add("default", () => {
  const actions = {
    cashierLinkClicked: action("Cashier link clicked"),
    quickDepositLinkClicked: action("Quick Deposit link clicked"),
  };

  const currency = select("Currency", CURRENCIES, CURRENCIES.EUR);
  const hasSavedPaymentMethods = boolean("Has Saved Payment Methods", false);
  const walletBalance = text("Wallet Balance", "£987.65");
  const bonusBalance = text("Bonus Balance", "£987.65");

  return (
    <MockStore>
      <QuickDeposit
        walletBalance={walletBalance}
        bonusBalance={bonusBalance}
        t={t}
        hasSavedPaymentMethods={hasSavedPaymentMethods}
        currency={currency}
        onCashierLinkClick={actions.cashierLinkClicked}
        onQuickDepositLinkClick={actions.quickDepositLinkClicked}
        classNames="t-background-grey-90 t-border-r u-padding-left--xlg u-padding-right--md u-padding-y"
      />
    </MockStore>
  );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PaymentMethodDetails } from "../PaymentMethodDetails";
import paymentMethodData from "../PaymentMethodDetails/__mocks__/cms";
import { QuickDepositSlip } from "./QuickDepositSlip";
import { translations as t } from "./__mocks__/cms";

const stories = storiesOf("QuickDepositSlip", module);

stories.add("Default", () => (
  <QuickDepositSlip
    t={t}
    currencySymbol="$"
    minAmount={20}
    maxAmount={100}
    onDeposit={action("Deposit attempt")}
    paymentMethodDetails={() => <PaymentMethodDetails {...paymentMethodData} />}
  />
));

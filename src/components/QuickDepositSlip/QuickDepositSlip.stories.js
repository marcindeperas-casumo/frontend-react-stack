// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { quickDepositMethod } from "Models/payments/__mocks__/quickDepositMethod.mock";
import MockStore from "Components/MockStore";
import { PaymentMethodDetails } from "../PaymentMethodDetails";
import { QuickDepositSlip } from "./QuickDepositSlip";
import { type QuickDepositSlipProps } from "./QuickDepositSlip.types";
import { translations } from "./__mocks__/cms";

const stories = storiesOf("QuickDepositSlip", module);

const props: QuickDepositSlipProps = {
  translations,
  currencySymbol: "$",
  minAmount: 20,
  maxAmount: 100,
  onDeposit: () => action("Deposit attempt"),
  renderPaymentMethodDetails: () => (
    <PaymentMethodDetails method={quickDepositMethod} />
  ),
};

stories.add("Default", () => (
  <MockStore>
    <QuickDepositSlip {...props} />
  </MockStore>
));

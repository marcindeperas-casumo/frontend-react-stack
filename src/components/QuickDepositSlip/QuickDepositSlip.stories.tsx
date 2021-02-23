// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { quickDepositMethod } from "Models/payments/__mocks__/quickDepositMethod.mock";
import MockStore from "Components/MockStore";
import { PaymentMethodDetails } from "../PaymentMethodDetails";
import { QuickDepositSlip } from "./QuickDepositSlip";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"./QuickDepositSlip.types"' has no exporte... Remove this comment to see the full error message
import { type QuickDepositSlipProps } from "./QuickDepositSlip.types";
import { translations } from "./__mocks__/cms";

const stories = storiesOf("QuickDepositSlip", module);

const props: QuickDepositSlipProps = {
  translations,
  currencySymbol: "$",
  minAmount: 20,
  maxAmount: 100,
  requestStatus: {
    state: "NONE",
  },
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

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import t from "./__mocks__/paymentResult.mocks";
import { PaymentResult } from "./PaymentResult";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";

const stories = storiesOf("RSModal/PaymentResult", module);

const successProps = {
  t,
  locale: "en-GB",
  currency: "GBP",
  amount: 200,
  closeModal: action("closeModal"),
  status: PAYMENT_RESULT_STATUS.success,
};

const failProps = {
  t,
  locale: "en-GB",
  currency: "GBP",
  amount: 200,
  closeModal: action("closeModal"),
  status: PAYMENT_RESULT_STATUS.fail,
  errorTitle: "Transaction was unsuccessful",
  errorMessage: "Try again or talk to us and we'll solve it together.",
};

stories.add("Success", () => (
  <MockStore>
    <PaymentResult {...successProps} />
  </MockStore>
));
stories.add("Failure", () => (
  <MockStore>
    <PaymentResult {...failProps} />
  </MockStore>
));

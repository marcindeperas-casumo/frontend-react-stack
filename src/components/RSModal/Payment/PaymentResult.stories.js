// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { PaymentResult } from "./PaymentResult";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";

const stories = storiesOf("RSModal/PaymentResult", module);

const successProps = {
  closeModal: action("closeModal"),
  config: { status: PAYMENT_RESULT_STATUS.success, amount: 200 },
};

const failProps = {
  closeModal: action("closeModal"),
  config: {
    status: PAYMENT_RESULT_STATUS.fail,
    errorCode: "creditcard.cardnumber.invalid",
  },
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

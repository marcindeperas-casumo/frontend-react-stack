// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { PaymentResult } from "./PaymentResult";
import { PAYMENT_RESULT_STATUS } from "./PaymentResult.types";
import t from "./__mocks__/paymentResult.mocks";

const stories = storiesOf("RSModal/PaymentResult", module);

const successProps = {
  closeModal: action("closeModal"),
  config: { status: PAYMENT_RESULT_STATUS.success, amount: 200 },
  t,
};

const failProps = {
  closeModal: action("closeModal"),
  config: { status: PAYMENT_RESULT_STATUS.fail },
  t,
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

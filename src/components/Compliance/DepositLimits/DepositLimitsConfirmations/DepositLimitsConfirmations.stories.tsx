// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/Confirmations", module);
stories.add("1 page", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["BEING_REVIEWED"]}
    lastButtonCaption="button_answer_questions"
    lastButtonAction={() => {}}
    fetchTranslations={() => {}}
  />
));
stories.add("2 pages", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["SAVED_RIGHT_AWAY", "RG_REQUIRED"]}
    lastButtonCaption="button_answer_questions"
    lastButtonAction={() => {}}
    fetchTranslations={() => {}}
  />
));

// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/DepositLimitsConfirmations", module);

stories.add("Player has requested decrease(s) only", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["SAVED_RIGHT_AWAY"]}
    lastButtonCaption="button_back_to_limits"
    lastButtonAction={() => {}}
    fetchTranslations={() => {}}
  />
));

stories.add("Player has requested removal(s) and/or increases only", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["RG_REQUIRED"]}
    lastButtonCaption="button_answer_questions"
    lastButtonAction={() => {}}
    fetchTranslations={() => {}}
  />
));

stories.add(
  "Player has requested decrease(s) and removal(s) and/or increases",
  () => (
    <DepositLimitsConfirmations
      t={t}
      pages={["SAVED_RIGHT_AWAY", "RG_REQUIRED"]}
      lastButtonCaption="button_answer_questions"
      lastButtonAction={() => {}}
      fetchTranslations={() => {}}
    />
  )
);

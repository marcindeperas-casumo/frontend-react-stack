import { storiesOf } from "@storybook/react";
import * as React from "react";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";
import t from "./__mocks__/cms";

const stories = storiesOf(
  "Compliance/DGOJ/DepositLimits/DepositLimitsConfirmations",
  module
);

stories.add("Player has requested decrease(s) only", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["SAVED_RIGHT_AWAY_DECREASED"]}
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

stories.add("Player has requested creating new limits", () => (
  <DepositLimitsConfirmations
    t={t}
    pages={["SAVED_RIGHT_AWAY_CREATED"]}
    lastButtonCaption="button_back_to_limits"
    lastButtonAction={() => {}}
    fetchTranslations={() => {}}
  />
));

stories.add(
  "Player has requested decrease(s) and removal(s) and/or increases",
  () => (
    <DepositLimitsConfirmations
      t={t}
      pages={["SAVED_RIGHT_AWAY_DECREASED", "RG_REQUIRED"]}
      lastButtonCaption="button_answer_questions"
      lastButtonAction={() => {}}
      fetchTranslations={() => {}}
    />
  )
);

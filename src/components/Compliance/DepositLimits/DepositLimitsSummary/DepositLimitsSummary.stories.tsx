// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import { DepositLimitsSummary } from "./DepositLimitsSummary";
import t from "./__mocks__/cms";
import preadjust from "./__mocks__/preadjust";

const stories = storiesOf("DepositLimits/DepositLimitsSummary", module);

const actions = {
  confirmLimitsAdjust: action("confirmLimitsAdjust clicked"),
  edit: action("edit clicked"),
  fetchTranslations: action("fetchTranslations"),
};
const range = {
  range: true,
  min: 10,
  max: 20000,
  step: 1,
};
stories.add("Default", () => {
  const currentLimits = {
    daily: number("Current daily limit", 600, range),
    weekly: number("Current weekly limit", 1500, range),
    monthly: number("Current monthly limit", 3000, range),
  };
  const newLimits = {
    daily: number("New daily limit", 600, range),
    weekly: number("New weekly limit", 1212, range),
    monthly: number("New monthly limit", 3333, range),
  };

  return (
    <DepositLimitsSummary
      locale="en-GB"
      currency="EUR"
      t={t}
      newLimits={{
        ...newLimits,
        currency: "EUR",
      }}
      currentLimits={{
        ...currentLimits,
        currency: "EUR",
      }}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ schema: string; increaseEffectiveAfter: st... Remove this comment to see the full error message
      preadjust={preadjust}
      {...actions}
    />
  );
});

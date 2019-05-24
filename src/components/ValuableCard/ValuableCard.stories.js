// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import {
  mockValuable as mockData,
  mockExpiryDate,
} from "./__mocks__/Valuable.mock";
import { ValuableCard } from "./";

const stories = storiesOf("ValuableCard", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const isLocked = boolean("Locked", false);
  const expiryHours = text("Expire in x hours", "100");

  const valuableDetails = mockData(valuableType);
  const expiryDate = mockExpiryDate(5);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  return (
    <ValuableCard
      {...valuableDetails}
      expiryDate={expiryDate}
      valuableState={valuableState}
      expiryDate={mockExpiryDate(expiryHours)}
    />
  );
});

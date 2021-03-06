import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean } from "@storybook/addon-knobs";
import React from "react";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import {
  mockValuable as mockData,
  mockExpiryDate,
} from "./__mocks__/Valuable.mock";
import { ValuableCard } from "./ValuableCard";

const stories = storiesOf("ValuableCard", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const isLocked = boolean("Locked?", false);
  const expiresWith24Hours = boolean("Expires with 24 hours", false);
  const expiryDate = mockExpiryDate(expiresWith24Hours);
  const valuableDetails = mockData(valuableType);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  return (
    <div style={{ width: "160px" }}>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <ValuableCard
        {...valuableDetails}
        valuableState={valuableState}
        expiryDate={expiryDate}
        onCardClick={action("click")}
        translations={translationsMock}
        className="t-elevation--10"
      />
    </div>
  );
});

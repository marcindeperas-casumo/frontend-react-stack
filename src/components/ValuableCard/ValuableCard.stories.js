// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";
import { ValuableCard } from "./ValuableCard";

const stories = storiesOf("ValuableCard", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const isLocked = boolean("Expires within 24 hours?", false);
  const expiryDateMock = new Date(Date.now() + 120 * 60000).getTime();
  const expiryDate = text("Expire date timeStamp", expiryDateMock);
  const valuableDetails = mockData(valuableType);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  return (
    <div style={{ width: "160px" }}>
      <ValuableCard
        {...valuableDetails}
        valuableState={valuableState}
        expiryDate={expiryDate}
        onCardClick={action("click")}
        translations={translationsMock}
        className="u-drop-shadow--sm"
      />
    </div>
  );
});

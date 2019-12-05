// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean } from "@storybook/addon-knobs/react";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { ValuableRowShell } from "./ValuableRowShell";
import { mockValuable as mockData } from "./__mocks__/Valuable.mock";
import { ValuableRow } from "./ValuableRow";

const stories = storiesOf("ValuableRow", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const isLocked = boolean("Locked", false);
  const onMoreInfo = () => {};

  const valuableDetails = mockData(valuableType);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  return (
    <ValuableRow
      {...valuableDetails}
      valuableState={valuableState}
      onClick={action("click")}
      translatedHoursUnit={translationsMock.hoursUnit}
      onMoreInfo={onMoreInfo}
    />
  );
});

stories.add("Valuable Row - Shell", () => {
  return <ValuableRowShell text="Don't use bonus" />;
});

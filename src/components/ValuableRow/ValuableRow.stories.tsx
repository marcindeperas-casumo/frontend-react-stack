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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    VALUABLE_TYPES.CASH;
  const isLocked = boolean("Locked", false);
  const isActive = boolean("Active", false);
  const onMoreInfo = () => {};

  const valuableDetails = mockData(valuableType);
  const valuableState = isLocked
    ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
      VALUABLE_STATES.LOCKED
    : // @ts-expect-error ts-migrate(2339) FIXME: Property 'FRESH' does not exist on type '{}'.
      VALUABLE_STATES.FRESH;

  return (
    <ValuableRow
      {...valuableDetails}
      valuableState={valuableState}
      onClick={action("click")}
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      translatedHoursUnit={translationsMock.hoursUnit}
      onMoreInfo={onMoreInfo}
      isSelected={isActive}
    />
  );
});

stories.add("Valuable Row - Shell", () => {
  return <ValuableRowShell text="Don't use bonus" />;
});

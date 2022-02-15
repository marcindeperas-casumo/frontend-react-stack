import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean } from "@storybook/addon-knobs";
import React from "react";
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
  const isActive = boolean("Active", false);
  const onMoreInfo = () => {};

  const valuableDetails = mockData(valuableType);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;

  return (
    <ValuableRow
      {...valuableDetails}
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      valuableState={valuableState}
      onClick={action("click")}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hoursUnit' does not exist on type '{ ava... Remove this comment to see the full error message
      translatedHoursUnit={translationsMock.hoursUnit}
      onMoreInfo={onMoreInfo}
      isSelected={isActive}
    />
  );
});

stories.add("Valuable Row - Shell", () => {
  return <ValuableRowShell onClick={action("click")} text="Don't use bonus" />;
});

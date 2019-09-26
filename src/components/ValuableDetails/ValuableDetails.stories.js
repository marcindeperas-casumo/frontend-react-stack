// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { F } from "ramda";
import { select } from "@storybook/addon-knobs/react";
import translations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock.json";
import { mockValuable as mockValuableCard } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import { ValuableDetails } from "./ValuableDetails";
import { ValuableDetailsWithModal } from "./ValuableDetailsWithModal";
import ValuableDetailsMockQuery from "./__mocks__/query.valuableDetails.mock";
import { mockValuable as mockData } from "./__mocks__/Valuables.mock";

const stories = storiesOf("ValuableDetails/ValuableDetails", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const valuableDetailsMock = mockData(valuableType);
  const expiresWith24Hours = boolean("Locked", false);
  const expiryDate = addHoursToNow(4);
  const expiresSoonValuable = {
    ...valuableDetailsMock,
    expiryDate,
  };

  return (
    <div style={{ width: "420px" }}>
      <ValuableDetails
        valuableDetails={
          expiresWith24Hours ? expiresSoonValuable : valuableDetailsMock
        }
        translations={translations}
        onConsumeValuable={F}
        onLaunchGame={() => {}}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard
            {...mockValuableCard(valuableType)}
            caveat={null}
            className="u-drop-shadow--lg"
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

stories.add("Default - With modal", () => {
  const valuableDetailsMock = mockData(VALUABLE_TYPES.CASH);

  return (
    <MockStore state={defaultState} queryMocks={[ValuableDetailsMockQuery]}>
      <ValuableDetailsWithModal
        isOpen={true}
        onClose={() => {}}
        valuableDetails={valuableDetailsMock}
        translations={translations}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard
            {...mockValuableCard(VALUABLE_TYPES.CASH)}
            caveat={null}
            className="u-drop-shadow--lg"
          />
        </div>
      </ValuableDetailsWithModal>
    </MockStore>
  );
});

stories.add("Deposit - Locked", () => {
  const valuableDetailsMock = mockData(VALUABLE_TYPES.DEPOSIT);

  return (
    <div style={{ width: "420px" }}>
      <ValuableDetails
        valuableDetails={valuableDetailsMock}
        translations={translations}
        onConsumeValuable={F}
        onLaunchGame={() => {}}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard
            {...mockValuableCard(VALUABLE_TYPES.DEPOSIT)}
            caveat={null}
            className="u-drop-shadow--lg"
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

const addHoursToNow = hours => {
  const result = new Date(Date.now());

  return result.setHours(result.getHours() + hours);
};

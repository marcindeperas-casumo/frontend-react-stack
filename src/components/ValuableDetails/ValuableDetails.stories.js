// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs/react";
import { F } from "ramda";
import translations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock";
import {
  mockValuable as mockValuableCard,
  mockExpiryDate,
} from "Components/ValuableCard/__mocks__/Valuable.mock";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import { ValuableDetails } from "./ValuableDetails";
import { ValuableDetailsWithModal } from "./ValuableDetailsWithModal";
import { mockValuable as mockData } from "./__mocks__/Valuables.mock";

const stories = storiesOf("ValuableDetails/ValuableDetails", module);

stories.add("Default", () => {
  const valuableType =
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    VALUABLE_TYPES.CASH;
  const valuableDetailsMock = mockData(valuableType);
  const expiresWith24Hours = boolean("Expires within 24 hours", false);
  const expiryDate = mockExpiryDate(expiresWith24Hours);

  return (
    <div style={{ width: "420px" }}>
      <ValuableDetails
        valuableDetails={{
          ...valuableDetailsMock,
          expiryDate,
        }}
        translations={translations}
        onConsumeValuable={F}
        onLaunchGame={() => {}}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard
            {...mockValuableCard(valuableType)}
            caveat={null}
            className="t-elevation--30"
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

stories.add("Default - With modal", () => {
  const valuableDetailsMock = mockData(VALUABLE_TYPES.CASH);

  return (
    <MockStore state={defaultState}>
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
            className="t-elevation--30"
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
            className="t-elevation--30"
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.CASH) ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
    VALUABLE_TYPES.CASH;
  const valuableDetailsMock = mockData(valuableType);
  const expiresWith24Hours = boolean("Expires within 24 hours", false);
  const expiryDate = mockExpiryDate(expiresWith24Hours);

  return (
    <div style={{ width: "420px" }}>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
          {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
  const valuableDetailsMock = mockData(VALUABLE_TYPES.CASH);

  return (
    <MockStore state={defaultState}>
      <ValuableDetailsWithModal
        isOpen={true}
        onClose={() => {}}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ expiryDate: number; valuableType: any; }' ... Remove this comment to see the full error message
        valuableDetails={valuableDetailsMock}
        translations={translations}
      >
        <div style={{ width: "160px" }}>
          {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
          <ValuableCard
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
  const valuableDetailsMock = mockData(VALUABLE_TYPES.DEPOSIT);

  return (
    <div style={{ width: "420px" }}>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <ValuableDetails
        valuableDetails={valuableDetailsMock}
        translations={translations}
        onConsumeValuable={F}
        onLaunchGame={() => {}}
      >
        <div style={{ width: "160px" }}>
          {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
          <ValuableCard
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
            {...mockValuableCard(VALUABLE_TYPES.DEPOSIT)}
            caveat={null}
            className="t-elevation--30"
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

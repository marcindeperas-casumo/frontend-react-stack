// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { F } from "ramda";
import translations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock.json";
import { mockValuable } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import mock from "./__mocks__/Valuables.json";
import { ValuableDetails } from "./ValuableDetails";
import { ValuableDetailsWithModal } from "./ValuableDetailsWithModal";
import ValuableDetailsMockQuery from "./__mocks__/query.valuableDetails.mock";

const stories = storiesOf("ValuableDetails/ValuableDetails", module);

stories.add("Default", () => {
  const valuableDetailsMock = mock[0];

  return (
    <div style={{ width: "420px" }}>
      <ValuableDetails
        valuableDetails={valuableDetailsMock}
        translations={translations}
        onConsumeValuable={F}
        onLaunchGame={() => {}}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard {...mockValuable(VALUABLE_TYPES.CASH)} caveat={null} />
        </div>
      </ValuableDetails>
    </div>
  );
});

stories.add("Default - With modal", () => {
  const valuableDetailsMock = mock[0];

  return (
    <MockStore state={defaultState} queryMocks={[ValuableDetailsMockQuery]}>
      <ValuableDetailsWithModal
        isOpen={true}
        onClose={() => {}}
        valuableDetails={valuableDetailsMock}
      >
        <div style={{ width: "160px" }}>
          <ValuableCard {...mockValuable(VALUABLE_TYPES.CASH)} caveat={null} />
        </div>
      </ValuableDetailsWithModal>
    </MockStore>
  );
});

stories.add("Deposit - Locked", () => {
  const valuableDetailsMock = mock[1];

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
            {...mockValuable(VALUABLE_TYPES.DEPOSIT)}
            caveat={null}
          />
        </div>
      </ValuableDetails>
    </div>
  );
});

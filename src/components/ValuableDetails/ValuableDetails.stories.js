// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
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
    <ValuableDetails {...valuableDetailsMock} translations={translations}>
      <ValuableCard {...mockValuable(VALUABLE_TYPES.CASH)} />
    </ValuableDetails>
  );
});

stories.add("Default - With modal", () => {
  const valuableDetailsMock = mock[0];

  return (
    <MockStore state={defaultState} queryMocks={[ValuableDetailsMockQuery]}>
      <ValuableDetailsWithModal
        isOpen={true}
        onClose={() => {}}
        closeTimeoutMS={100}
        {...valuableDetailsMock}
      >
        <ValuableCard {...mockValuable(VALUABLE_TYPES.CASH)} />
      </ValuableDetailsWithModal>
    </MockStore>
  );
});

stories.add("Deposit - Locked", () => {
  const valuableDetailsMock = mock[1];

  return (
    <ValuableDetails {...valuableDetailsMock} translations={translations}>
      <ValuableCard {...mockValuable(VALUABLE_TYPES.DEPOSIT)} />
    </ValuableDetails>
  );
});

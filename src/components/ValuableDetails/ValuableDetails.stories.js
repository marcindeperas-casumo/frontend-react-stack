// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import mockValuable from "Components/ValuableCard/__mocks__/Valuable.json";
import { ValuableCard } from "Components/ValuableCard";
import translations from "./__mocks__/Translations.json";
import mock from "./__mocks__/Valuables.json";
import { ValuableDetails } from "./ValuableDetails";

const stories = storiesOf("ValuableDetails/ValuableDetails", module);

stories.add("Default", () => {
  const valuableDetailsMock = mock[0];

  return (
    <ValuableDetails {...valuableDetailsMock} translations={translations}>
      <ValuableCard {...mockValuable[0]} />
    </ValuableDetails>
  );
});

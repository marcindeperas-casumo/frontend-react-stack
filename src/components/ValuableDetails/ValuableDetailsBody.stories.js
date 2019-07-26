// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ValuableDetailsBody } from "./ValuableDetailsBody";
import mock from "./__mocks__/Valuables.json";
import translations from "./__mocks__/Translations.json";

const stories = storiesOf(
  "ValuableCardDetails/ValuableCardDetailsBody",
  module
);

stories.add("Default", () => {
  const { details, expirationTimeInHours, caveat, termsContent } = mock[0];
  const expirationTextValue = `${expirationTimeInHours} hours`;

  return (
    <ValuableDetailsBody
      details={details}
      expirationValueText={expirationTextValue}
      caveat={caveat}
      termsContent={termsContent}
      translations={translations}
    />
  );
});

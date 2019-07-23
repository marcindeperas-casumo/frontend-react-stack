// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

const stories = storiesOf("ValuableCardDetailsExpirationLabel", module);

stories.add("Default", () => {
  const expirationText = "2 Hours";
  const translations = { expiresIn: "Expires in" };

  return (
    <ValuableDetailsExpirationLabel
      translations={translations}
      expirationText={expirationText}
    />
  );
});

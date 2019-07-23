// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

const stories = storiesOf(
  "ValuableCardDetails/ValuableCardDetailsExpirationLabel",
  module
);

stories.add("Default", () => {
  const text = "Expires In 2 Hours";

  return (
    <ValuableDetailsExpirationLabel text={text} className="t-background-red" />
  );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ValuableDetailsHeaderBackground } from "./ValuableDetailsHeaderBackground";
import mock from "./__mocks__/Valuables.json";

const stories = storiesOf(
  "ValuableCardDetails/ValuableDetailsHeaderBackground",
  module
);

stories.add("Default", () => {
  const { id, backgroundImageUrl } = mock[0];
  const dimensions = {
    width: 379,
    height: 271,
  };

  return (
    <ValuableDetailsHeaderBackground
      imageUrl={backgroundImageUrl}
      id={id}
      {...dimensions}
    />
  );
});

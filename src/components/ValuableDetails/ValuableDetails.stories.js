// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import translations from "./__mocks__/Translations.json";
import mock from "./__mocks__/Valuables.json";
import { ValuableDetails } from "./ValuableDetails";

const hostElementId = "portal-host-element";
const stories = storiesOf("ValuableCardDetails/ValuableDetails", module);

function ValuableDetailsStory() {
  const dimensions = {
    width: 379,
    height: 271,
  };

  const valuableMock = mock[0];

  return (
    <ValuableDetails
      {...valuableMock}
      translations={translations}
      {...dimensions}
    />
  );
}

stories
  .addDecorator(story => (
    <WaitForHostElement hostElementId={hostElementId}>
      {story()}
    </WaitForHostElement>
  ))
  .add("Default", ValuableDetailsStory);

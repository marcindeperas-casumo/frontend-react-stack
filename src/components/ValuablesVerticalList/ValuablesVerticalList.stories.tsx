// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";

const stories = storiesOf("ValuablesVerticalList", module);

stories.add("Default", () => {
  const valuables = mockValuables();
  const onConsume = () => {};

  return (
    <ValuablesVerticalList
      title="Valuables Vertical list"
      valuables={valuables}
      onConsumeValuable={onConsume}
      translations={translationsMock}
    />
  );
});

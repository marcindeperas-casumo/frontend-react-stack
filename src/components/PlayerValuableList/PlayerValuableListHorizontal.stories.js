// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import valuables from "Components/ValuableCard/__mocks__/Valuable.json";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import translationsMock from "./__mocks__/translations.mock.json";

const stories = storiesOf("PlayerValuableListHorizontal", module);

stories.add("PlayerValuableListHorizontal (Connected)", () => {
  const consumeValuable = () => {};

  return (
    <PlayerValuableListHorizontal
      loading={false}
      valuables={valuables}
      onConsumeValuable={consumeValuable}
      translations={translationsMock}
    />
  );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { PlayerValuableListHorizontal } from "Components/PlayerValuableListHorizontal/PlayerValuableListHorizontal";

const stories = storiesOf("PlayerValuableListHorizontal", module);

stories.add("PlayerValuableListHorizontal (Connected)", () => {
  const valuables = mockValuables();
  const consumeValuable = () => {};

  return (
    <PlayerValuableListHorizontal
      loading={false}
      title={"Player Valuables"}
      valuables={valuables}
      onConsumeValuable={consumeValuable}
    />
  );
});

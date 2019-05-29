// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { PlayerValuableListHorizontal } from "Components/PlayerValuableListHorizontal/PlayerValuableListHorizontal";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("PlayerValuableListHorizontal", module);

if (isNotChromatic) {
  stories.add("PlayerValuableListHorizontal (Connected)", () => {
    const valuables = mockValuables();
    const consumeValuable = () => {};

    return (
      <PlayerValuableListHorizontal
        loading={false}
        error={false}
        listTitle="Player Valuables"
        valuables={valuables}
        onConsumeValuable={consumeValuable}
      />
    );
  });
}

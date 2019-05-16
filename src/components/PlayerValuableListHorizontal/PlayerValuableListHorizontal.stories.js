// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PlayerValuableListHorizontal } from "Components/PlayerValuableListHorizontal";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import { normalQuery } from "./__mocks__/query.playerValuables.mock";

const stories = storiesOf("PlayerValuableListHorizontal", module);

if (isNotChromatic) {
  stories.add("PlayerValuableListHorizontal (Connected)", () => (
    <MockStore queryMocks={[normalQuery]}>
      <PlayerValuableListHorizontal />
    </MockStore>
  ));
}

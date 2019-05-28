// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";
import { PlayerValuableListHorizontal } from "Components/PlayerValuableListHorizontal";
import isNotChromatic from "Storybook/isNotChromatic";
import { normalQuery } from "./__mocks__/query.playerValuables.mock";

const stories = storiesOf("PlayerValuableListHorizontal", module);

if (isNotChromatic) {
  stories.add("PlayerValuableListHorizontal (Connected)", () => {
    return (
      <MockedProvider mocks={[normalQuery]} addTypename={false}>
        <PlayerValuableListHorizontal />
      </MockedProvider>
    );
  });
}

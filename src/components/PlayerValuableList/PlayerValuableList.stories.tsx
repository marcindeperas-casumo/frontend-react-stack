import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

const stories = storiesOf("PlayerValuableList", module);

stories.add("Horizontal", () => (
  <MockStore>
    <MockedProvider mocks={mocks.mockedValuables}>
      <PlayerValuableListHorizontal />
    </MockedProvider>
  </MockStore>
));

stories.add("Vertical default", () => (
  <MockStore>
    <MockedProvider mocks={mocks.mockedValuables}>
      <PlayerValuableListVertical />
    </MockedProvider>
  </MockStore>
));

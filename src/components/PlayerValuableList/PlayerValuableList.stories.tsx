import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

const stories = storiesOf("PlayerValuableList", module);

stories.add("Horizontal", () => (
  <MockedProvider mocks={mocks.mockedValuables}>
    <PlayerValuableListHorizontal />
  </MockedProvider>
));

stories.add("Vertical default", () => (
  <MockedProvider mocks={mocks.mockedValuables}>
    <PlayerValuableListVertical />
  </MockedProvider>
));

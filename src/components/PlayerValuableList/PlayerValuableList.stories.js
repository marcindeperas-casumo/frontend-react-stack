// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

const stories = storiesOf("PlayerValuableList", module);

stories.add("Horizontal", () => (
  <MockedProvider mocks={mocks.mockedValuables}>
    <PlayerValuableListHorizontal />
  </MockedProvider>
));

stories.add("Vertical", () => (
  <div style={{ width: "375px" }}>
    <MockedProvider mocks={mocks.mockedValuables}>
      <PlayerValuableListVertical />
    </MockedProvider>
  </div>
));

// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
import { GameListExclusiveQuery } from "./GameListHorizontalExclusive.graphql";
import { gamesListMock } from "./__mock__";

const stories = storiesOf("GameListHorizontalExclusive", module);
const mocks = [
  {
    request: {
      query: GameListExclusiveQuery,
      variables: {
        name: "exclusiveGames",
      },
    },
    result: {
      data: {
        gamesList: gamesListMock,
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <MockStore>
      <GameListHorizontalExclusive list={mocks[0].result.data.gamesList} />
    </MockStore>
  </MockedProvider>
));

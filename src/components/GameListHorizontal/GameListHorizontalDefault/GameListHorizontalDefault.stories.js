// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
import { GameListQuery } from "./GameListHorizontalDefault.graphql";
import { gamesListMock } from "./__mock__";

const stories = storiesOf("GameListHorizontalDefault", module);
const mocks = [
  {
    request: {
      query: GameListQuery,
      variables: {
        name: "latestPlayedGames",
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
      <GameListHorizontalDefault list={mocks[0].result.data.gamesList} />
    </MockStore>
  </MockedProvider>
));

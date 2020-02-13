// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { GameListLiveCasinoQuery } from "./GameListHorizontalLiveCasino.graphql";
import { gamesListMock } from "./__mock__";

const stories = storiesOf("GameListHorizontalLiveCasino", module);
const mocks = [
  {
    request: {
      query: GameListLiveCasinoQuery,
      variables: {
        name: "liveCasinoGames",
      },
    },
    result: {
      data: {
        gamesList: { gamesListMock },
        seeMoreText: "See more",
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <GameListHorizontalLiveCasino
      list={mocks[0].result.data.gamesList}
      seeMoreText={mocks[0].result.data.seeMoreText}
    />
  </MockedProvider>
));

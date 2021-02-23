// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListHorizontalLiveCasino... Remove this comment to see the full error message
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
        gamesList: gamesListMock,
        seeMoreText: "See more",
        playNowText: "Play Now",
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <MockStore>
      <GameListHorizontalLiveCasino
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; name: string; games: { backgro... Remove this comment to see the full error message
        list={mocks[0].result.data.gamesList}
        seeMoreText={mocks[0].result.data.seeMoreText}
        playNowText={mocks[0].result.data.playNowText}
      />
    </MockStore>
  </MockedProvider>
));

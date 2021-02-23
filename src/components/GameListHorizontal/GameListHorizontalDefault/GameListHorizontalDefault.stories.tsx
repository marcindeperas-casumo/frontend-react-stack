// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListHorizontalDefault.gr... Remove this comment to see the full error message
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ __typename: string; id: string; name: stri... Remove this comment to see the full error message */}
      <GameListHorizontalDefault list={mocks[0].result.data.gamesList} />
    </MockStore>
  </MockedProvider>
));

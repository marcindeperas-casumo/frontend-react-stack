// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import MockStore from "Components/MockStore";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListHorizontalExclusive.... Remove this comment to see the full error message
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; name: string; games: { isInMai... Remove this comment to see the full error message */}
      <GameListHorizontalExclusive list={mocks[0].result.data.gamesList} />
    </MockStore>
  </MockedProvider>
));

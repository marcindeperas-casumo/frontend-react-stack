// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GamesVirtualListContainer from "Components/GamesVirtualList";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import MockStore from "Components/MockStore";
import defaultState from "Models/__mocks__/state.mock";
import isNotChromatic from "Storybook/isNotChromatic";
import GameRowSearch from "Components/GameRowSearch";

const stories = storiesOf("GamesVirtualList", module);

const gamesArray = [
  { game: "easter-island" },
  { game: "starburst" },
  { game: "mega-fortune" },
  { game: "mega-fortune-dreams" },
  { game: "bakers-treat" },
  { game: "rapunzels-tower" },
  { game: "big-bad-wolf" },
  { game: "book-of-ra-deluxe" },
  { game: "diamond-mine" },
  { game: "raging-rhino" },
  { game: "jammin-jars" },
  { game: "legacy-of-egypt" },
  { game: "danger-high-voltage" },
  { game: "88-fortunes" },
  { game: "fruit-warp" },
  { game: "gonzos-quest" },
  { game: "white-rabbit" },
  { game: "action-bank" },
  { game: "wild-toro" },
  { game: "twin-spin" },
];

const state = {
  ...defaultState,
  playerGames: {
    count: gamesArray.length,
  },
  schema: {
    gameList: {
      playerGamesPage0: {
        games: gamesArray,
      },
    },
  },
};

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore state={state}>
        <div className="u-height--screen">
          <GamesVirtualListContainer
            renderItem={id => <GameRowSearch slug={id} />}
            renderTitle={() => {}}
          />
        </div>
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default",
  () => (
    <MockStore>
      <div className="u-height--screen">
        <GamesVirtualList
          games={gamesArray}
          renderItem={id => <GameRowSearch slug={id} />}
          renderTitle={() => {}}
          preloadFetchPlayerGames={() => {}}
          preloadFetchPlayerGamesCount={() => {}}
          rowCount={20}
        />
      </div>
    </MockStore>
  ),
  info({ text: "Default" })
);

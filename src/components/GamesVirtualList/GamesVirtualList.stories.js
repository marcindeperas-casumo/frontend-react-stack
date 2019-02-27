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
  "easter-island",
  "starburst",
  "mega-fortune",
  "mega-fortune-dreams",
  "bakers-treat",
  "rapunzels-tower",
  "big-bad-wolf",
  "book-of-ra-deluxe",
  "diamond-mine",
  "raging-rhino",
  "jammin-jars",
  "legacy-of-egypt",
  "danger-high-voltage",
  "88-fortunes",
  "fruit-warp",
  "gonzos-quest",
  "white-rabbit",
  "action-bank",
  "wild-toro",
  "twin-spin",
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
        <div style={{ height: "100vh" }}>
          <GamesVirtualListContainer
            renderItem={id => <GameRowSearch slug={id} />}
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
      <div style={{ height: "100vh" }}>
        <GamesVirtualList
          games={gamesArray}
          renderItem={id => <GameRowSearch slug={id} />}
          preloadFetchPlayerGames={() => {}}
          preloadFetchPlayerGamesCount={() => {}}
          rowCount={20}
        />
      </div>
    </MockStore>
  ),
  info({ text: "Default" })
);

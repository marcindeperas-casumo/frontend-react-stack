import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GameList from "Components/GameList";
import GameListPresentational from "Components/GameList/GameList";
import MockStore from "Components/MockStore";
import { GAME_LIST_IDS } from "Src/constants";

const stories = storiesOf("GameList", module);
const list = {
  games: [
    "book-of-ra-deluxe",
    "diamond-mine",
    "raging-rhino",
    "jammin-jars",
    "legacy-of-egypt",
    "big-bad-wolf",
    "starburst",
  ],
  id: "popularGames",
  title: "Popular",
};

const GameListStory = () => (
  <MockStore>
    <GameList id={GAME_LIST_IDS.POPULAR_GAMES} />
  </MockStore>
);

const GameListPresentationalStory = () => (
  <MockStore>
    <GameListPresentational list={list} />
  </MockStore>
);

stories.add(
  "GameList (Connected)",
  GameListStory,
  info({
    text: `...`,
  })
);

stories.add(
  "GameList (Presentational)",
  GameListPresentationalStory,
  info({
    text: `...`,
  })
);

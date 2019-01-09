// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GameListHorizontal from "Components/GameListHorizontal";
import GameListHorizontalPresentational from "Components/GameListHorizontal/GameListHorizontal";
import MockStore from "Components/MockStore";
import { GAME_LIST_IDS } from "Src/constants";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameListHorizontal", module);
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

const GameListHorizontalStory = () => (
  <MockStore>
    <GameListHorizontal id={GAME_LIST_IDS.POPULAR_GAMES} />
  </MockStore>
);

const GameListHorizontalPresentationalStory = () => (
  <MockStore>
    <GameListHorizontalPresentational list={list} isLoading={false} />
  </MockStore>
);

if (isNotChromatic) {
  stories.add(
    "GameListHorizontal (Connected)",
    GameListHorizontalStory,
    info({
      text: `...`,
    })
  );
}

stories.add(
  "GameListHorizontal (Presentational)",
  GameListHorizontalPresentationalStory,
  info({
    text: `...`,
  })
);

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { GameListHorizontal } from "Components/GameListHorizontal";
import { GameListHorizontal as GameListHorizontalPresentational } from "Components/GameListHorizontal/GameListHorizontal";
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

const GameListHorizontalStory = () => {
  const gameListIds = [
    GAME_LIST_IDS.POPULAR_GAMES,
    GAME_LIST_IDS.EXCLUSIVE_GAMES,
  ];
  const listId = select(
    "Game List Id",
    gameListIds,
    GAME_LIST_IDS.POPULAR_GAMES
  );
  return (
    <MockStore>
      <GameListHorizontal id={listId} />
    </MockStore>
  );
};

const GameListHorizontalPresentationalStory = () => (
  <MockStore>
    <GameListHorizontalPresentational
      list={list}
      isLoading={false}
      seeMoreText="SEE MORE"
    />
  </MockStore>
);

if (isNotChromatic) {
  stories.add("GameListHorizontal (Connected)", GameListHorizontalStory);
}

stories.add(
  "GameListHorizontal (Presentational)",
  GameListHorizontalPresentationalStory
);

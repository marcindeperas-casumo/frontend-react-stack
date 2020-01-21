// @flow
import React from "react";
import { GAME_LIST_IDS } from "Src/constants";
import { GameListHorizontalExclusive } from "../GameListHorizontalExclusive";
import { GameListHorizontalLiveCasino } from "../GameListHorizontalLiveCasino";
import { GameListHorizontalDefault } from "../GameListHorizontalDefault";

export const GAMES_LISTS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameListHorizontalExclusive,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: GameListHorizontalLiveCasino,
  // Let's check if we still need this
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: GameListHorizontalLiveCasino,
  default: GameListHorizontalDefault,
};

export const GameListHorizontalCMS = ({ id }: { id: string }) => {
  const GameList = GAMES_LISTS[id] || GAMES_LISTS.default;

  return <GameList id={id} />;
};

// @flow
import React from "react";
import { GAME_LIST_IDS, URL_PREFIXES } from "Src/constants";
import { GameListHorizontalExclusive } from "../GameListHorizontalExclusive";
import { GameListHorizontalLiveCasino } from "../GameListHorizontalLiveCasino";
import { GameListHorizontalDefault } from "../GameListHorizontalDefault";

const GAMES_LISTS =
  window.location.hostname.split(".").pop() === URL_PREFIXES.es_es // eslint-disable-line fp/no-mutating-methods
    ? {
        [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameListHorizontalExclusive,
        default: GameListHorizontalDefault,
      }
    : {
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

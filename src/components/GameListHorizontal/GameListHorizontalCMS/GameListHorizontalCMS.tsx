import React from "react";
import { GAME_LIST_IDS } from "Src/constants";
import { GameListHorizontalExclusive } from "../GameListHorizontalExclusive";
import { GameListHorizontalLiveCasino } from "../GameListHorizontalLiveCasino";
import { GameListHorizontalDefault } from "../GameListHorizontalDefault";

const GAMES_LISTS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameListHorizontalExclusive,
  default: GameListHorizontalDefault,
};

export const GameListHorizontalCMS = ({
  id,
  type,
  see_more_link,
}: {
  id: string;
  see_more_link?: string;
  type?: "gameTile" | "liveCasinoCard";
}) => {
  if (type === "liveCasinoCard") {
    return (
      <GameListHorizontalLiveCasino
        id={id}
        seeMoreLink={see_more_link === "" ? null : see_more_link}
      />
    );
  }

  const GameList = GAMES_LISTS[id] || GAMES_LISTS.default;

  return <GameList id={id} />;
};

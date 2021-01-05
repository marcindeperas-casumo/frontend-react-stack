// @Flow
import React from "react";
import { useTranslations } from "Utils/hooks";
import { CMS_SLUGS as CMS_SLUG } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
export type Props = {
  className?: ?string,
  game: A.GameTile_Game,
  imgixOpts?: ?Object,
  ratio?: ?string,
};

export const GameTileContainer = props => {
  const t =
    useTranslations(`${CMS_SLUG.LOBBY}.${CMS_SLUG.GAMES_LIST}`) |
    { play_button_text_game_tile: "Play" };
  return <GameTile t={t} {...props} />;
};

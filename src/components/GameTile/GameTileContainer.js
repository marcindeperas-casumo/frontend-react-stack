// @Flow
import React from "react";
import { useTranslations } from "Utils/hooks";
import { CMS_SLUGS as CMS_SLUG } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

export type Props = {
  className?: string,
  game: A.GameTile_Game,
  imgixOpts?: Object,
  ratio?: string,
};

export const GameTileContainer = props => {
  const t = useTranslations("new-game-browser.top-nav");
  return <GameTile t={t} {...props} />;
};

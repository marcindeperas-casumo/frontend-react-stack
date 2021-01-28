// @flow
import React from "react";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";
import { CMS_SLUGS } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

export type GameTileContainerProps = {
  className?: string,
  game: A.GameTile_Game,
  imgixOpts?: Object,
  ratio?: string,
};

export const GameTileContainer = (props: GameTileContainerProps) => {
  const t = useTranslations(`${CMS_SLUGS.LOBBY}.${CMS_SLUGS.GAMES_LIST}`);
  return <GameTile t={t} {...props} />;
};

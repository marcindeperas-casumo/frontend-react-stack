import React from "react";
import { useTranslations } from "Utils/hooks";
import * as A from "Types/apollo";
import { CMS_SLUGS } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

export type GameTileContainerProps = {
  className?: string;
  game: A.GameTile_GameFragment;
  imgixOpts?: Object;
  ratio?: string;
};

export const GameTileContainer = (props: GameTileContainerProps) => {
  const t = useTranslations(`${CMS_SLUGS.LOBBY}.${CMS_SLUGS.GAMES_LIST}`);
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'play_button_text_game_tile' is missing i... Remove this comment to see the full error message
  return <GameTile t={t} {...props} />;
};

import React from "react";
import { useDispatch } from "react-redux";
import {
  useTranslations,
  useTranslatedUrl,
  useGameLaunchData,
} from "Utils/hooks";
import * as A from "Types/apollo";
import { ROUTE_IDS } from "Src/constants";
import { JackpotMarkImageContainer } from "Components/JackpotMarkImage/JackpotMarkImageContainer";
import { CMS_SLUGS } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

export type GameTileContainerProps = {
  className?: string;
  game: A.GameTile_GameFragment;
  imgixOpts?: Object;
  ratio?: string;
};

export const GameTileContainer = (props: GameTileContainerProps) => {
  const { slug } = props.game;

  const { error } = useGameLaunchData({
    playForFun: false,
    slug,
  });
  const dispatch = useDispatch();
  const t = useTranslations<{
    play_button_text_game_tile: string;
  }>(`${CMS_SLUGS.LOBBY}.${CMS_SLUGS.GAMES_LIST}`);

  const gameDetailsPath = useTranslatedUrl(ROUTE_IDS.GAME_DETAILS, { slug });

  const tileJackpotMark = (
    <JackpotMarkImageContainer gameSlug={slug} type="tile" />
  );

  return (
    <GameTile
      t={t}
      tileJackpotMark={tileJackpotMark}
      gameDetailsPath={`/${gameDetailsPath}`}
      gameExcluded={error}
      dispatch={dispatch}
      {...props}
    />
  );
};

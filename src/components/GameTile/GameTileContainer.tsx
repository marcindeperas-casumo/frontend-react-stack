import { useDispatch } from "react-redux";
import React from "react";
import { useTranslations } from "Utils/hooks";
import { showModal } from "Models/modal";
import * as A from "Types/apollo";
import { GAME_CATEGORIES_MAP, REACT_APP_MODAL } from "Src/constants";
import { JackpotMarkImageContainer } from "Components/JackpotMarkImage/JackpotMarkImageContainer";
import { launchGame } from "Services/LaunchGameService";
import { getGameExcludedForPlayer } from "Src/api/api.gameExclusion";
import { CMS_SLUGS } from "../GameListPage/GameList.constants";
import { GameTile } from "./GameTile";

export type GameTileContainerProps = {
  className?: string;
  game: A.GameTile_GameFragment;
  imgixOpts?: Object;
  ratio?: string;
};

export const GameTileContainer = (props: GameTileContainerProps) => {
  const { slug, category } = props.game;
  const dispatch = useDispatch();
  const t = useTranslations<{
    play_button_text_game_tile: string;
  }>(`${CMS_SLUGS.LOBBY}.${CMS_SLUGS.GAMES_LIST}`);

  const gameLauncher = () => {
    getGameExcludedForPlayer().then(response => {
      if (
        response &&
        response.length > 0 &&
        response[0].gameType === GAME_CATEGORIES_MAP[category]
      ) {
        dispatch(showModal(REACT_APP_MODAL.ID.EXCLUDED_GAME, {}));
      } else {
        launchGame({ slug: slug });
      }
    });
  };
  const tileJackpotMark = (
    <JackpotMarkImageContainer gameSlug={slug} type="tile" />
  );

  return (
    <GameTile
      t={t}
      tileJackpotMark={tileJackpotMark}
      gameLauncher={gameLauncher}
      {...props}
    />
  );
};

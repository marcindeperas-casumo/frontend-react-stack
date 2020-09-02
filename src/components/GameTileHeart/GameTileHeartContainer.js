// @flow
import React from "react";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
import {
  useAddGameToMyList,
  useRemoveGameFromMyList,
} from "./GameTileHeart.Mutations";

type Props = {
  className?: string,
  gameId: string,
  isInMyList: boolean,
};

export const GameTileHeartContainer = ({
  className = "u-padding u-width--2xlg",
  gameId,
  isInMyList,
}: Props) => {
  const addGame = useAddGameToMyList(gameId);
  const removeGame = useRemoveGameFromMyList(gameId);

  const onFavouriteGame = isInMyList ? removeGame : addGame;

  return (
    <GameTileHeart
      className={className}
      onClick={onFavouriteGame}
      isActive={isInMyList}
    />
  );
};

// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
import { GameTileHeartQuery } from "./GameTileHeart.graphql";
import {
  useAddGameToMyList,
  useRemoveGameFromMyList,
} from "./GameTileHeart.Mutations";

type Props = {
  className?: string,
  gameId: string,
};

export const GameTileHeartContainer = ({
  className = "u-padding u-width--2xlg",
  gameId,
}: Props) => {
  const { data, loading } = useQuery<A.GameTileHeartQuery, _>(
    GameTileHeartQuery
  );
  const addGame = useAddGameToMyList(gameId);
  const removeGame = useRemoveGameFromMyList(gameId);

  if (loading) {
    return null;
  }

  const isInMyList = (data?.gamesList?.games || []).find(x => x.id === gameId);
  const onFavouriteGame = isInMyList ? removeGame : addGame;

  return (
    <GameTileHeart
      className={className}
      onClick={onFavouriteGame}
      isActive={isInMyList}
    />
  );
};

// @flow
import React from "react";
import { includes } from "ramda";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
import { GAME_LIST_QUERY } from "Components/GameListHorizontal/GameListHorizontalContainer";
import {
  MyListGameIdsQuery,
  AddGameToMyList,
  RemoveGameFromMyList,
} from "./GameTileHeart.graphql";

type Props = {
  gameId: string,
  gameSlug: string,
};

export const GameTileHeartContainer = ({ gameId, gameSlug }: Props) => {
  const [addGameToMyList] = useMutation(AddGameToMyList);
  const [removeGameFromMyList] = useMutation(RemoveGameFromMyList);
  const {
    data: {
      gamesList: { games: myListGames },
    },
  } = useQuery(MyListGameIdsQuery);
  const isInMyList = includes({ id: gameId, __typename: "Game" }, myListGames);
  const addGame = (slug: string) =>
    addGameToMyList({
      variables: {
        gameSlug: slug,
      },
      // __FIX__ - have the server return this.
      refetchQueries: [{ query: GAME_LIST_QUERY, variables: { id: "myList" } }],
    });
  const removeGame = (slug: string) =>
    removeGameFromMyList({
      variables: {
        gameSlug: slug,
      },
      // __FIX__ - have the server return this.
      refetchQueries: [{ query: GAME_LIST_QUERY, variables: { id: "myList" } }],
    });
  const onFavouriteGame = () =>
    isInMyList ? removeGame(gameSlug) : addGame(gameSlug);

  return (
    <GameTileHeart
      className="u-padding u-width--2xlg"
      onClick={onFavouriteGame}
      isActive={isInMyList}
    />
  );
};

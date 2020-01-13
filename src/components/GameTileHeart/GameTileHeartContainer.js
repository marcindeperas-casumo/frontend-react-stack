// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { reject } from "ramda";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
import { GAME_LIST_QUERY } from "Components/GameListHorizontal/GameListHorizontalContainer";
import { AddGameToMyList, RemoveGameFromMyList } from "./GameTileHeart.graphql";

type Props = {
  className: string,
  gameId: string,
  gameSlug: string,
  isInMyList: Boolean,
};

export const GameTileHeartContainer = ({
  className = "u-padding u-width--2xlg",
  gameId,
  gameSlug,
  isInMyList,
}: Props) => {
  const [addGameToMyList] = useMutation(AddGameToMyList);
  const [removeGameFromMyList] = useMutation(RemoveGameFromMyList);

  const addGame = (slug: string, id: string) =>
    addGameToMyList({
      variables: {
        gameSlug: slug,
        id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addGameToMyList: {
          __typename: "Game",
          id: gameId,
          isInMyList: true,
        },
      },
      update: (proxy, { data: { addGameToMyList } }) => {
        const data = proxy.readQuery({
          query: GAME_LIST_QUERY,
          variables: { id: "myList" },
        });
        proxy.writeQuery({
          query: GAME_LIST_QUERY,
          variables: { id: "myList" },
          data: {
            gamesList: {
              ...data.gamesList,
              games: [addGameToMyList, ...data.gamesList.games],
            },
          },
        });
      },
    });
  const removeGame = (slug: string, id: string) =>
    removeGameFromMyList({
      variables: {
        gameSlug: slug,
        id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addGameToMyList: {
          __typename: "Game",
          id: gameId,
          isInMyList: false,
        },
      },
      update: (proxy, { data: { addGameToMyList } }) => {
        const data = proxy.readQuery({
          query: GAME_LIST_QUERY,
          variables: { id: "myList" },
        });
        proxy.writeQuery({
          query: GAME_LIST_QUERY,
          variables: { id: "myList" },
          data: {
            gamesList: {
              ...data.gamesList,
              games: reject(game => game.id === gameId, data.gamesList.games),
            },
          },
        });
      },
    });
  const onFavouriteGame = () =>
    isInMyList ? removeGame(gameSlug, gameId) : addGame(gameSlug, gameId);

  return (
    <GameTileHeart
      className={className}
      onClick={onFavouriteGame}
      isActive={isInMyList}
    />
  );
};

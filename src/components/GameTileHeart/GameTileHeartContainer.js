// @flow
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { GameTileHeart } from "Components/GameTileHeart/GameTileHeart";
import { GAME_LIST_QUERY } from "Components/GameListHorizontal/GameListHorizontalContainer";
import { AddGameToMyList, RemoveGameFromMyList } from "./GameTileHeart.graphql";

type Props = {
  gameId: string,
  gameSlug: string,
  isInMyList: Boolean,
};

export const GameTileHeartContainer = ({
  gameId,
  gameSlug,
  isInMyList,
}: Props) => {
  const [addGameToMyList] = useMutation(AddGameToMyList);
  const [removeGameFromMyList] = useMutation(RemoveGameFromMyList);

  const addGame = (slug: string) =>
    addGameToMyList({
      variables: {
        gameSlug: slug,
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
        console.log(data, addGameToMyList);
      },
    });
  const removeGame = (slug: string) =>
    removeGameFromMyList({
      variables: {
        gameSlug: slug,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addGameToMyList: {
          __typename: "Game",
          id: gameId,
          isInMyList: false,
        },
      },
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

// @flow
import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GameTile } from "Components/GameTile/GameTile";
import { GAME_LIST_QUERY } from "Components/GameListHorizontal/GameListHorizontalContainer";
import { AddGameToMyList, RemoveGameFromMyList } from "./GameTile.graphql";

const MY_LIST_GAME_IDS = gql`
  {
    gamesList(listId: "myList") {
      games {
        id
        slug
      }
    }
  }
`;

// __FIX__: change "id" to "game" here + add Flow typing
export const GameTileContainer = ({ id: game }) => {
  const [addGameToMyList] = useMutation(AddGameToMyList);
  const [removeGameFromMyList] = useMutation(RemoveGameFromMyList);
  const {
    data: {
      gamesList: { games: myListGames },
    },
  } = useQuery(MY_LIST_GAME_IDS);
  const isInMyList = myListGames
    .map(myListGame => myListGame.id)
    .includes(game.id);

  const addGame = (gameSlug: string) =>
    addGameToMyList({
      variables: {
        gameSlug,
      },
      refetchQueries: [{ query: GAME_LIST_QUERY, variables: { id: "myList" } }],
    });

  const removeGame = (gameSlug: string) =>
    removeGameFromMyList({
      variables: {
        gameSlug,
      },
      refetchQueries: [{ query: GAME_LIST_QUERY, variables: { id: "myList" } }],
    });

  // __FIX__: update all properties to come from the Apollo store
  return (
    <GameTile
      game={game}
      isInMyList={isInMyList}
      onLaunchGame={() => {}}
      onFavouriteGame={() => {
        // pick add or remove based on isInMyList????
        if (isInMyList) {
          removeGame(game.slug).then(() =>
            console.log(`removing game - ${game.slug}`)
          );
        } else {
          addGame(game.slug).then(() =>
            console.log(`adding game - ${game.slug}`)
          );
        }
      }}
    />
  );
};

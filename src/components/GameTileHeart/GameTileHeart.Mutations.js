// @flow
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { reject } from "ramda";
import * as A from "Types/apollo";
import {
  GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
  GAME_LIST_IDS,
} from "Src/constants";
import { GameTileHeartQuery } from "./GameTileHeart.graphql";

const LIST_ID = GAME_LIST_IDS.MY_LIST;

const ADD_GAME = gql`
  mutation AddGameToMyList($id: String!) {
    addGameToMyList(id: $id) {
      id
      isInMyList
    }
  }
`;

const REMOVE_GAME = gql`
  mutation RemoveGameFromMyList($id: String!) {
    removeGameFromMyList(id: $id) {
      id
      isInMyList
    }
  }
`;

export const useAddGameToMyList = (id: string) => {
  const [addGame] = useMutation<A.AddGameToMyList, A.AddGameToMyListVariables>(
    ADD_GAME,
    {
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addGameToMyList: {
          __typename: "Game",
          id,
          isInMyList: true,
        },
      },
      update: (cache, response) => {
        // $FlowFixMe - at first glance this appears to be a problem with react-hooks type defs
        const cacheData = cache.readQuery<A.GameTileHeartQuery>({
          query: GameTileHeartQuery,
          variables: {
            numberOfGames: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
            listId: LIST_ID,
          },
        });
        if (cacheData && cacheData.gamesList) {
          cache.writeQuery({
            query: GameTileHeartQuery,
            variables: {
              numberOfGames: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
              listId: LIST_ID,
            },
            data: {
              gamesList: {
                ...cacheData.gamesList,
                games: [
                  response.data?.addGameToMyList,
                  ...cacheData.gamesList.games,
                ],
              },
            },
          });
        }
      },
    }
  );

  return addGame;
};

export const useRemoveGameFromMyList = (id: string) => {
  const [removeGame] = useMutation<
    A.RemoveGameFromMyList,
    A.RemoveGameFromMyListVariables
  >(REMOVE_GAME, {
    variables: {
      id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      removeGameFromMyList: {
        __typename: "Game",
        id,
        isInMyList: false,
      },
    },
    update: (cache, response) => {
      // $FlowFixMe - at first glance this appears to be a problem with react-hooks type defs
      const cacheData = cache.readQuery<A.GameTileHeartQuery>({
        query: GameTileHeartQuery,
        variables: {
          numberOfGames: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
          listId: LIST_ID,
        },
      });
      if (cacheData && cacheData.gamesList) {
        cache.writeQuery({
          query: GameTileHeartQuery,
          variables: {
            numberOfGames: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
            listId: LIST_ID,
          },
          data: {
            gamesList: {
              ...cacheData.gamesList,
              games: reject(game => game.id === id, cacheData.gamesList.games),
            },
          },
        });
      }
    },
  });

  return removeGame;
};

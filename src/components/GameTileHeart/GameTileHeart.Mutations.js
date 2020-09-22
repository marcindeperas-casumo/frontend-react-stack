// @flow
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { reject } from "ramda";
import * as A from "Types/apollo";
import { GameTileHeartQuery } from "./GameTileHeart.graphql";

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

export const numberOfGames = 1e5;
export const useAddGameToMyList = (id: string) => {
  const [addGame] = useMutation<A.AddGameToMyList, A.AddGameToMyListVariables>(
    ADD_GAME,
    {
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        addGameToMyList: {
          __typename: "Game",
          id,
          isInMyList: true,
        },
      },
      update: (cache, response) => {
        getAllNumberOfGamesVars(cache).forEach(x => {
          // $FlowFixMe - at first glance this appears to be a problem with react-hooks type defs
          const cacheData = cache.readQuery<
            A.GameTileHeartQuery,
            A.GameTileHeartQueryVariables
          >({
            query: GameTileHeartQuery,
            variables: { numberOfGames: x },
          });
          if (cacheData && cacheData.gamesList) {
            cache.writeQuery({
              query: GameTileHeartQuery,
              variables: { numberOfGames: x },
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
        });
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
    variables: { id },
    optimisticResponse: {
      __typename: "Mutation",
      removeGameFromMyList: {
        __typename: "Game",
        id,
        isInMyList: false,
      },
    },
    update: (cache, response) => {
      getAllNumberOfGamesVars(cache).forEach(x => {
        // $FlowFixMe - at first glance this appears to be a problem with react-hooks type defs
        const cacheData = cache.readQuery<
          A.GameTileHeartQuery,
          A.GameTileHeartQueryVariables
        >({
          query: GameTileHeartQuery,
          variables: { numberOfGames: x },
        });

        if (cacheData && cacheData.gamesList) {
          cache.writeQuery({
            query: GameTileHeartQuery,
            variables: { numberOfGames: x },
            data: {
              gamesList: {
                ...cacheData.gamesList,
                games: reject(
                  game => game.id === id,
                  cacheData.gamesList.games
                ),
              },
            },
          });
        }
      });
    },
  });

  return removeGame;
};

function getAllNumberOfGamesVars(cache: any) {
  if (!cache.data.data.ROOT_QUERY) {
    return [];
  }

  return Object.keys(cache.data.data["GamesList:myList"])
    .map(x => (x.match(/numberOfGames.*?(\d*?)\}/) || [])[1])
    .filter(Boolean)
    .map(x => parseInt(x));
}

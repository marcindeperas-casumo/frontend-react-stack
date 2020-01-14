// @flow
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { reject } from "ramda";
import { GAME_LIST_IDS } from "Src/constants";
import { GAME_LIST_QUERY } from "Components/GameListHorizontal/GameListHorizontalContainer";

const ADD_GAME = gql`
  mutation AddGameToMyList($slug: String!, $id: String!) {
    addGameToMyList(slug: $slug, id: $id) {
      id
      isInMyList
    }
  }
`;

const REMOVE_GAME = gql`
  mutation RemoveGameFromMyList($slug: String!, $id: String!) {
    removeGameFromMyList(slug: $slug, id: $id) {
      id
      isInMyList
    }
  }
`;

export const useAddGameToMyList = (slug: string, id: string) => {
  const [addGame] = useMutation(ADD_GAME, {
    variables: {
      slug,
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
    update: (proxy, { data: { addGameToMyList } }: { data: Object }) => {
      const data = proxy.readQuery({
        query: GAME_LIST_QUERY,
        variables: { id: GAME_LIST_IDS.MY_LIST },
      });
      proxy.writeQuery({
        query: GAME_LIST_QUERY,
        variables: { id: GAME_LIST_IDS.MY_LIST },
        data: {
          gamesList: {
            ...data.gamesList,
            games: [addGameToMyList, ...data.gamesList.games],
          },
        },
      });
    },
  });

  return addGame;
};

export const useRemoveGameFromMyList = (slug: string, id: string) => {
  const [removeGame] = useMutation(REMOVE_GAME, {
    variables: {
      slug,
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
    update: (proxy, { data: { removeGameFromMyList } }) => {
      const data = proxy.readQuery({
        query: GAME_LIST_QUERY,
        variables: { id: GAME_LIST_IDS.MY_LIST },
      });
      proxy.writeQuery({
        query: GAME_LIST_QUERY,
        variables: { id: GAME_LIST_IDS.MY_LIST },
        data: {
          gamesList: {
            ...data.gamesList,
            games: reject(game => game.id === id, data.gamesList.games),
          },
        },
      });
    },
  });

  return removeGame;
};

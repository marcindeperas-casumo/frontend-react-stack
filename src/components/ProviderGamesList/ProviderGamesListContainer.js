// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ProviderGamesList, PAGE_SIZE } from "./ProviderGamesList";

type Props = {
  /** Provider slug whose games will be fetched */
  provider: string,
};

const GAME_STUDIO_QUERY = gql`
  query gameStudioQuery($slug: String!, $page: Int!, $pageSize: Int!) {
    gameStudio(slug: $slug) {
      id
      gamesCount
      games(page: $page, pageSize: $pageSize) {
        id
        backgroundImage
        isInMaintenance
        logo
        name
        slug
        lobby {
          id
          tableId
          symbol
          provider
          results
          image
          type
          betBehind
          bets {
            min
            max
            symbol
          }
        }
      }
    }
  }
`;

export const ProviderGamesListContainer = ({ provider: slug }: Props) => {
  const { data, loading, fetchMore } = useQuery(GAME_STUDIO_QUERY, {
    variables: { slug, page: 0, pageSize: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
  });
  const games = data?.gameStudio?.games || [];
  const nextPage = Math.floor(games.length / PAGE_SIZE);

  return (
    <ProviderGamesList
      games={games}
      loading={loading && !games}
      gamesCount={data?.gameStudio?.gamesCount}
      onLoadMore={() =>
        fetchMore({
          variables: {
            page: nextPage,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }

            return {
              gameStudio: {
                ...prev.gameStudio,
                games: [
                  ...prev.gameStudio.games,
                  ...fetchMoreResult.gameStudio.games,
                ],
              },
            };
          },
        })
      }
    />
  );
};

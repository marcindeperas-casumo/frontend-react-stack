// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { ProviderGamesList, PAGE_SIZE } from "./ProviderGamesList";
import { GameStudioQuery } from "./ProviderGamesList.graphql";
type Props = {
  /** Provider slug whose games will be fetched */
  provider: string,
};

export const ProviderGamesListContainer = ({ provider: slug }: Props) => {
  const { data, loading, fetchMore } = useQuery<
    A.GameStudioQuery,
    A.GameStudioQueryVariables
  >(GameStudioQuery, {
    variables: { slug, page: 0, pageSize: PAGE_SIZE },
  });
  const games = data?.gameStudio?.games || [];
  const gamesCount = data?.gameStudio?.gamesCount || 0;
  const nextPage = Math.floor(games.length / PAGE_SIZE);

  const fetchMoreGames = () => {
    return fetchMore<A.GameSearchQueryVariables>({
      variables: {
        page: nextPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.gameStudio ||
          !prev.gameStudio
        ) {
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
    });
  };

  return (
    <ProviderGamesList
      games={games}
      loading={loading && !games}
      gamesCount={gamesCount}
      onLoadMore={fetchMoreGames}
    />
  );
};

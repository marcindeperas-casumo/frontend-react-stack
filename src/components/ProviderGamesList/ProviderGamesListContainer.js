// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as R from "ramda";
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
  const [pageNumber, setPageNumber] = React.useState(1);

  const fetchMoreGames = () => {
    setPageNumber(pageNumber + 1);
    return fetchMore<A.GameStudioQueryVariables>({
      variables: {
        page: pageNumber,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.gameStudio ||
          !prev.gameStudio
        ) {
          return prev;
        }

        const sortByGameName = R.sortBy(R.prop("name"));

        // We are already checking if gameStudio exists few lines above, no idea why this keeps complaining
        const mergedGames = [
          // $FlowFixMe
          ...prev?.gameStudio.games,
          // $FlowFixMe
          ...fetchMoreResult.gameStudio.games,
        ];

        const sortedGames = sortByGameName(mergedGames);

        return {
          gameStudio: {
            ...prev.gameStudio,
            games: sortedGames,
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

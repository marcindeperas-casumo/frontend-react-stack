// @flow
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { EVENT_LOCATIONS } from "Src/constants";
import { GameSearchSuggestionsListContainerQuery } from "./GameSearchSuggestionsListContainer.graphql";

export type Props = {
  searchResults: Array<any>,
};

const PAGE_ROOT = "root:mobile.games-search:fields";

export const useGameSearchSuggestions = ({ searchResults }: Props) => {
  // eslint-disable-next-line fp/no-let
  let list;

  const { data: suggestedGamesData, loading: suggestedGamesLoading } = useQuery<
    A.GameSearchSuggestionsListContainerQuery,
    A.GameSearchSuggestionsListContainerQueryVariables
  >(GameSearchSuggestionsListContainerQuery, {
    variables: {
      titleId: `${PAGE_ROOT}.similar_games`,
      listId: "suggestedGames",
    },
  });
  const {
    data: latestPlayedGamesData,
    loading: latestPlayedGamesLoading,
  } = useQuery<
    A.GameSearchSuggestionsListContainerQuery,
    A.GameSearchSuggestionsListContainerQueryVariables
  >(GameSearchSuggestionsListContainerQuery, {
    variables: {
      titleId: `${PAGE_ROOT}.continue_playing`,
      listId: "latestPlayedGames",
    },
  });
  const { data: popularGamesData, loading: popularGamesLoading } = useQuery<
    A.GameSearchSuggestionsListContainerQuery,
    A.GameSearchSuggestionsListContainerQueryVariables
  >(GameSearchSuggestionsListContainerQuery, {
    variables: {
      titleId: `${PAGE_ROOT}.popular_games`,
      listId: "popularGames",
    },
  });

  const loading =
    suggestedGamesLoading || latestPlayedGamesLoading || popularGamesLoading;

  /* eslint-disable fp/no-mutation */
  if (
    searchResults &&
    searchResults.length === 1 &&
    suggestedGamesData?.gamesList?.games?.length
  ) {
    list = {
      games: suggestedGamesData?.gamesList?.games,
      title: suggestedGamesData?.title,
      location: EVENT_LOCATIONS.SUGGESTED_GAMES,
      type: "suggested",
    };
  } else if (latestPlayedGamesData?.gamesList?.games?.length) {
    list = {
      games: latestPlayedGamesData?.gamesList?.games,
      title: latestPlayedGamesData?.title,
      location: EVENT_LOCATIONS.LATEST_PLAYED_GAMES,
      type: "latest",
    };
  } else {
    list = {
      games: popularGamesData?.gamesList?.games || [],
      title: popularGamesData?.title || "",
      location: EVENT_LOCATIONS.POPULAR_GAMES,
      type: "popular",
    };
  }
  /* eslint-enable fp/no-mutation */

  return {
    list,
    loading,
  };
};

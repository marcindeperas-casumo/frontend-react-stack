// @flow
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { EVENT_LOCATIONS } from "Src/constants";
import {
  GameSearchSuggestionsListContainer_SuggestedGames,
  GameSearchSuggestionsListContainer_LatestPlayedGames,
  GameSearchSuggestionsListContainer_PopularGames,
} from "./GameSearchSuggestionsListContainer.graphql";

export const useGameSearchSuggestions = ({ searchResults }) => {
  // eslint-disable-next-line fp/no-let
  let list;

  const {
    data: suggestedGamesData,
    loading: suggestedGamesLoading,
  } = useQuery<A.GameSearchSuggestionsListContainer_SuggestedGames>(
    GameSearchSuggestionsListContainer_SuggestedGames
  );
  const {
    data: latestPlayedGamesData,
    loading: latestPlayedGamesLoading,
  } = useQuery<A.GameSearchSuggestionsListContainer_LatestPlayedGames>(
    GameSearchSuggestionsListContainer_LatestPlayedGames
  );
  const {
    data: popularGamesData,
    loading: popularGamesLoading,
  } = useQuery<A.GameSearchSuggestionsListContainer_PopularGames>(
    GameSearchSuggestionsListContainer_PopularGames
  );

  const loading =
    suggestedGamesLoading || latestPlayedGamesLoading || popularGamesLoading;

  /* eslint-disable fp/no-mutation */
  if (
    searchResults &&
    searchResults.length === 1 &&
    suggestedGamesData?.gamesList?.games.length
  ) {
    list = {
      games: suggestedGamesData.gamesList.games,
      title: suggestedGamesData.title,
      location: EVENT_LOCATIONS.SUGGESTED_GAMES,
      type: "suggested",
    };
  } else if (latestPlayedGamesData?.gamesList?.games.length) {
    list = {
      games: latestPlayedGamesData.gamesList.games,
      title: latestPlayedGamesData.title,
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

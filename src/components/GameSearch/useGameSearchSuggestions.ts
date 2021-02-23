// @flow
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { EVENT_LOCATIONS } from "Src/constants";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameSearchSuggestionsList.gr... Remove this comment to see the full error message
import { GameSearchSuggestionsListContainerQuery } from "./GameSearchSuggestionsList.graphql";

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
      listId: "latestPlayedGames",
    },
  });
  const { data: popularGamesData, loading: popularGamesLoading } = useQuery<
    A.GameSearchSuggestionsListContainerQuery,
    A.GameSearchSuggestionsListContainerQueryVariables
  >(GameSearchSuggestionsListContainerQuery, {
    variables: {
      listId: "popularGames",
    },
  });

  const { t } = useTranslationsGql({
    suggestedGamesTitle: `${PAGE_ROOT}.similar_games`,
    continuePlayingTitle: `${PAGE_ROOT}.continue_playing`,
    popularGamesTitle: `${PAGE_ROOT}.popular_games`,
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'suggestedGamesTitle' does not exist on t... Remove this comment to see the full error message
      title: t.suggestedGamesTitle,
      location: EVENT_LOCATIONS.SUGGESTED_GAMES,
      type: "suggested",
    };
  } else if (latestPlayedGamesData?.gamesList?.games?.length) {
    list = {
      games: latestPlayedGamesData?.gamesList?.games,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'continuePlayingTitle' does not exist on ... Remove this comment to see the full error message
      title: t.continuePlayingTitle,
      location: EVENT_LOCATIONS.LATEST_PLAYED_GAMES,
      type: "latest",
    };
  } else {
    list = {
      games: popularGamesData?.gamesList?.games || [],
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'popularGamesTitle' does not exist on typ... Remove this comment to see the full error message
      title: t.popularGamesTitle,
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

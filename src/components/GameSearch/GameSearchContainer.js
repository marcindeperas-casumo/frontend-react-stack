// @flow
import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  gameSearchResults,
  initFetchQuerySearch,
  isLoadingSelector,
  hasNoResultsSelector,
  hasNoLatestPlayedSelector,
  clearSearch,
  gameSearchQuerySelector,
} from "Models/gameSearch";
import { preloadFetchPlayerGames } from "Models/playerGames";
import { gameListGamesSelector } from "Models/schema";
import { getField, fetchPageBySlug } from "Models/cms";
import { GAME_LIST_IDS } from "Src/constants";

const searchCMSPageSlug = "mobile.games-search";

const GameSearchConnected = connect(
  createStructuredSelector({
    latestPlayedGames: gameListGamesSelector(GAME_LIST_IDS.LATEST_PLAYED),
    popularGames: gameListGamesSelector(GAME_LIST_IDS.POPULAR_GAMES),
    searchResults: gameSearchResults,
    loading: isLoadingSelector,
    noResults: hasNoResultsSelector,
    hasNoLatestPlayed: hasNoLatestPlayedSelector,
    latestPlayedGamesTitle: getField({
      slug: searchCMSPageSlug,
      field: "continue_playing",
    }),
    popularGamesTitle: getField({
      slug: searchCMSPageSlug,
      field: "popular_games",
    }),
    inputPromptPlaceholder: getField({
      slug: searchCMSPageSlug,
      field: "input_prompt",
    }),
    query: gameSearchQuerySelector,
  }),
  {
    initFetchQuerySearch,
    clearSearch,
    preloadFetchPlayerGames,
    fetchPageBySlug: () => fetchPageBySlug(searchCMSPageSlug),
  }
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => (
  <GameSearchConnected {...props} />
);
export default GameSearchContainer;

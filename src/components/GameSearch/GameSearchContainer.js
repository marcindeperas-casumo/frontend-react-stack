// @flow
import React from "react";
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
import { gameListSelector } from "Models/schema";
import { getField, fetchPageBySlug } from "Models/cms";
import { GAME_LIST_IDS } from "Src/constants";

const searchCMSPageSlug = "mobile.games-search";

const GameSearchConnected = connect(
  state => {
    const { games: latestPlayedGames } = gameListSelector(
      GAME_LIST_IDS.LATEST_PLAYED
    )(state);
    const { games: popularGames } = gameListSelector(
      GAME_LIST_IDS.POPULAR_GAMES
    )(state);

    return {
      latestPlayedGames,
      popularGames,
      searchResults: gameSearchResults(state),
      loading: isLoadingSelector(state),
      noResults: hasNoResultsSelector(state),
      hasNoLatestPlayed: hasNoLatestPlayedSelector(state),
      latestPlayedGamesTitle: getField({
        slug: searchCMSPageSlug,
        field: "continue_playing",
      })(state),
      popularGamesTitle: getField({
        slug: searchCMSPageSlug,
        field: "popular_games",
      })(state),
      inputPromptPlaceholder: getField({
        slug: searchCMSPageSlug,
        field: "input_prompt",
      })(state),
      query: gameSearchQuerySelector(state),
    };
  },
  {
    initFetchQuerySearch,
    clearSearch,
    preloadFetchPlayerGames,
    fetchPageBySlug: () => fetchPageBySlug(searchCMSPageSlug),
  }
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => {
  return <GameSearchConnected {...props} />;
};

export default GameSearchContainer;

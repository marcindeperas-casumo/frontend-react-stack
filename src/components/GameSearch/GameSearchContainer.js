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
import {
  preloadFetchPlayerGames,
  playerGamesCountSelector,
} from "Models/playerGames";
import { gameListSelector } from "Models/schema";
import { launchGame } from "Models/games";
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
      hasNoResults: hasNoResultsSelector(state),
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
      rowCount: playerGamesCountSelector(state),
    };
  },
  dispatch => ({
    fetchSearch: q => dispatch(initFetchQuerySearch(q)),
    clearSearch: q => dispatch(clearSearch()),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
    preloadFetchPlayerGames: index => dispatch(preloadFetchPlayerGames(index)),
    startFetchCmsPage: () => dispatch(fetchPageBySlug(searchCMSPageSlug)),
  })
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => {
  return <GameSearchConnected {...props} />;
};

export default GameSearchContainer;

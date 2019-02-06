// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  playerGamesSelector,
  gameSearchResults,
  preloadFetchPlayerGames,
  initFetchQuerySearch,
  isLoadingSelector,
  hasNoResultsSelector,
  hasNoLatestPlayedSelector,
  clearSearch,
  listTypes,
} from "Models/gameSearch";
import { gameListSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { getField, fetchPageBySlug } from "Models/cms";
const searchCMSPageSlug = "mobile.games-search";

const GameSearchConnected = connect(
  state => {
    const { games: latestPlayedGames } = gameListSelector(
      listTypes.LATEST_PLAYED
    )(state);
    const { games: popularGames } = gameListSelector(listTypes.POPULAR_GAMES)(
      state
    );

    return {
      playerGames: playerGamesSelector(state),
      searchResults: gameSearchResults(state),
      loading: isLoadingSelector(state),
      hasNoResults: hasNoResultsSelector(state),
      hasNoLatestPlayed: hasNoLatestPlayedSelector(state),
      latestPlayedGames,
      popularGames,
      latestPlayedGamesTitle: getField({
        slug: searchCMSPageSlug,
        field: "continue_playing",
      })(state),
      popularGamesTitle: getField({
        slug: searchCMSPageSlug,
        field: "no_results_title",
      })(state),
      inputPromptPlaceholder: getField({
        slug: searchCMSPageSlug,
        field: "input_prompt",
      })(state),
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

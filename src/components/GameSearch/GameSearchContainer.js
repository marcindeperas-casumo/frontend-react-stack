// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  playerGamesSelector,
  gameSearchResults,
  isPlayerGamesLoaded,
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
      isPlayerGamesLoaded: isPlayerGamesLoaded(state),
      searchResults: gameSearchResults(state),
      loading: isLoadingSelector(state),
      hasNoResults: hasNoResultsSelector(state),
      hasNoLatestPlayed: hasNoLatestPlayedSelector(state),
      latestPlayedGames,
      popularGames,
    };
  },
  dispatch => ({
    preloadFetchPlayerGames: () => dispatch(preloadFetchPlayerGames()),
    fetchSearch: q => dispatch(initFetchQuerySearch(q)),
    clearSearch: q => dispatch(clearSearch()),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
  })
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => {
  return <GameSearchConnected {...props} />;
};

export default GameSearchContainer;

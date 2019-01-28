// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  playerGamesAllSelector,
  gameSearchResultsSelector,
  isGameSearchLoadedFactory,
  preloadFetchPlayerGames,
  initFetchQuerySearch,
  isGameSearchLoading,
  isGameSearchNoMatch,
  clearSearch,
} from "Models/gameSearch";
import { gameListSelector } from "Models/schema";
import { launchGame } from "Models/games";

const GameSearchConnected = connect(
  state => ({
    games: playerGamesAllSelector(state),
    searchResults: gameSearchResultsSelector(state),
    latestPlayedGames: gameListSelector("latestPlayedGames")(state).games,
    isLoaded: isGameSearchLoadedFactory(state),
    loading: isGameSearchLoading(state),
    noMatch: isGameSearchNoMatch(state),
  }),
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

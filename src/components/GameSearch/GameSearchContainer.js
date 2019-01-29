// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  playerGamesAll,
  gameSearchResults,
  isGameSearchLoaded,
  preloadFetchPlayerGames,
  initFetchQuerySearch,
  isGameSearchLoading,
  isGameSearchNoMatch,
  hasNoLatestPlayed,
  clearSearch,
  listTypes,
} from "Models/gameSearch";
import { gameListSelector } from "Models/schema";
import { launchGame } from "Models/games";

const GameSearchConnected = connect(
  state => {
    const { games: latestPlayedGames } =
      gameListSelector(listTypes.LATEST_PLAYED_ID)(state);
    const { games: popularGames } =
      gameListSelector(listTypes.POPULAR_GAMES_ID)(state);

    return {
      games: playerGamesAll(state),
      searchResults: gameSearchResults(state),
      isLoaded: isGameSearchLoaded(state),
      loading: isGameSearchLoading(state),
      noMatch: isGameSearchNoMatch(state),
      hasNoLatestPlayed: hasNoLatestPlayed(state),
      latestPlayedGames,
      popularGames,
    }
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

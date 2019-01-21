// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  gameSearchSelector,
  gameSearchResultsSelector,
  isGameSearchLoadedFactory,
  fetchAllGames,
  fetchSearch,
} from "Models/gameSearch";
import { launchGame } from "Models/games";

const GameSearchConnected = connect(
  state => ({
    games: gameSearchSelector(state),
    searchResults: gameSearchResultsSelector(state),
    isLoaded: isGameSearchLoadedFactory(state),
  }),
  dispatch => ({
    fetchAllGames: () => dispatch(fetchAllGames()),
    fetchSearch: q => dispatch(fetchSearch(q)),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
  })
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => {
  return <GameSearchConnected {...props} />;
};

export default GameSearchContainer;

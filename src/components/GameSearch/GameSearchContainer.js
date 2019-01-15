// @flow
import React from "react";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  gameSearchSelector,
  isGameSearchLoadedFactory,
  fetchAllGames,
} from "Models/gameSearch";
import { launchGame } from "Models/games";

const GameSearchConnected = connect(
  state => ({
    games: gameSearchSelector(state),
    isLoaded: isGameSearchLoadedFactory(state),
  }),
  dispatch => ({
    fetchAllGames: () => dispatch(fetchAllGames()),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
  })
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => {
  return <GameSearchConnected {...props} />;
};

export default GameSearchContainer;

// @flow
import React from "react";
import { connect } from "react-redux";
import GameList from "Components/GameList/GameList";
import { gameListSelector } from "Reducers/schema/selector";
import { isGameListLoaded } from "Reducers/games/games.selectors";

type Props = {
  /** The id of the game list. */
  id: string,
};

const GameListConnected = connect((state, { id }) => ({
  isLoading: !isGameListLoaded(state),
  list: gameListSelector(id)(state),
}))(GameList);

const GameListContainer = (props: Props) => <GameListConnected {...props} />;

export default GameListContainer;

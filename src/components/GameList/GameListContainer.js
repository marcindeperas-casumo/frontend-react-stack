// @flow
import React from "react";
import { connect } from "react-redux";
import GameList from "Components/GameList/GameList";
import { gameListSelector } from "Reducers/schema/selector";

type Props = {
  /** The id of the game list. */
  id: string,
};

const GameListConnected = connect((state, { id }) => ({
  list: gameListSelector(id)(state),
}))(GameList);

const GameListContainer = (props: Props) => <GameListConnected {...props} />;

export default GameListContainer;

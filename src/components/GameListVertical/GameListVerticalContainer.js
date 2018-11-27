// @flow
import React from "react";
import { connect } from "react-redux";
import GameListVertical from "Components/GameListVertical/GameListVertical";
import { gameListSelector } from "Models/schema/selector";
import { isGameListLoaded } from "Models/games/games.selectors";
import { fetchThemGames } from "Models/curated/curated.actions";

type Props = {
  /** The id of the game list. */
  id: string,
};

const GameListVerticalConnected = connect(
  null,
  (dispatch, { ids }) => ({
    fetch: () => dispatch(fetchThemGames(ids)),
  })
)(GameListVertical);

const GameListVerticalContainer = (props: Props) => (
  <GameListVerticalConnected {...props} />
);

export default GameListVerticalContainer;

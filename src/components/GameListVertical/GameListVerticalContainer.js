// @flow
import React from "react";
import { connect } from "react-redux";
import GameListVertical from "Components/GameListVertical/GameListVertical";
import { fetchGamesBySlugs } from "Models/games";

type Props = {
  /** The array of ids to show in a game list. */
  ids: Array<string>,
};

const GameListVerticalConnected = connect(
  null,
  (dispatch, { ids }) => ({
    fetch: () => dispatch(fetchGamesBySlugs(ids)),
  })
)(GameListVertical);

const GameListVerticalContainer = (props: Props) => (
  <GameListVerticalConnected {...props} />
);

export default GameListVerticalContainer;

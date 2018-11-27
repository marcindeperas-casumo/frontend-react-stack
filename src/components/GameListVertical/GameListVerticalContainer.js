// @flow
import React from "react";
import { connect } from "react-redux";
import GameListVertical from "Components/GameListVertical/GameListVertical";
import { fetchPromotionGames } from "Models/promotion";

type Props = {
  /** The array of ids to show in a game list. */
  ids: Array<string>,
};

const GameListVerticalConnected = connect(
  null,
  (dispatch, { ids }) => ({
    fetch: () => dispatch(fetchPromotionGames(ids)),
  })
)(GameListVertical);

const GameListVerticalContainer = (props: Props) => (
  <GameListVerticalConnected {...props} />
);

export default GameListVerticalContainer;

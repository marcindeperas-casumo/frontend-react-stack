// @flow
import React from "react";
import { connect } from "react-redux";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import { gameSelector } from "Models/schema";
import { launchGame, updateMyList, isGameInMyListSelector } from "Models/games";

const mapStateToProps = (state, props) => ({
  game: gameSelector(props.id)(state),
  isInMyList: isGameInMyListSelector(props.id)(state),
});
const mapDispatchToProps = (dispatch, props) => ({
  onLaunchGame: () => dispatch(launchGame(props.id)),
  onFavouriteGame: () => dispatch(updateMyList(props.id)),
});

const GameTileExclusiveConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameTileExclusive);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameTileExclusiveContainer = ({ id }: Props) => (
  <GameTileExclusiveConnected id={id} />
);

export default GameTileExclusiveContainer;

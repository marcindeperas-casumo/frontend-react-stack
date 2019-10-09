// @flow
import React from "react";
import { connect } from "react-redux";
import GameTile from "Components/GameTile/GameTile";
import { gameSelector } from "Models/schema";
import { launchGame, updateMyList, isGameInMyList } from "Models/games";

const GameTileConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
    isInMyList: isGameInMyList(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(launchGame(props.id)),
    onFavouriteGame: () => dispatch(updateMyList(props.id)),
  })
)(GameTile);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameTileContainer = ({ id }: Props) => <GameTileConnected id={id} />;

export default GameTileContainer;

import { connect } from "react-redux";
import GameTile2 from "Components/GameTile2";
import { gameSelector } from "Reducers/schema/selector";
import { actions as gameActions } from "Reducers/games";

const getGameData = (state, props) => gameSelector(props.id)(state);
const getGameActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch(gameActions.launchGame(props.id)),
});

const GameTileContainer = connect(
  getGameData,
  getGameActions
)(GameTile2);

export default GameTileContainer;

import { connect } from "react-redux";
import GameTile from "Components/GameTile";
import { gameSelector } from "Reducers/schema/selector";
import { actions as gameActions } from "Reducers/games";

const getGameData = (state, props) => gameSelector(props.id)(state);
const mapDispatchToProps = (dispatch, props) => ({
  onLaunchGame: () => dispatch(gameActions.launchGame(props.id)),
});

const GameTileContainer = connect(
  getGameData,
  mapDispatchToProps
)(GameTile);

export default GameTileContainer;

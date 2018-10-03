import ExclusiveGameTile from "Components/ExclusiveGameTile";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { actions as gameActions } from "Reducers/games";

const getGameData = (state, props) => gameSelector(props.id)(state);
const getGameActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch(gameActions.launchGame(props.id)),
});

const ExclusiveGameTileContainer = connect(
  getGameData,
  getGameActions
)(ExclusiveGameTile);

export default ExclusiveGameTileContainer;

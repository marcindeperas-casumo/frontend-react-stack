import ExclusiveGameTile from "Components/ExclusiveGameTile";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";

const getGameData = (state, props) => gameSelector(props.id)(state);
const getGameActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch({ type: "##MARKER", slug: props.id }),
});

const ExclusiveGameTileContainer = connect(
  getGameData,
  getGameActions
)(ExclusiveGameTile);

export default ExclusiveGameTileContainer;

import ExclusiveGameTile from "Components/ExclusiveGameTile";
import { connect } from "react-redux";

const getData = (state, props) => state.schema.game[props.id];
const getActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch({ type: "##MARKER", slug: props.id }),
});

const ExclusiveGameTileContainer = connect(
  getData,
  getActions
)(ExclusiveGameTile);

export default ExclusiveGameTileContainer;

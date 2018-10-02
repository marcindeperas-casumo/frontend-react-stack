import { connect } from "react-redux";
import GameTile2 from "Components/GameTile2";

const getData = (state, props) => state.schema.game[props.id];
const getActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch({ type: "##MARKER", slug: props.id }),
});

const GameTileContainer = connect(
  getData,
  getActions
)(GameTile2);

export default GameTileContainer;

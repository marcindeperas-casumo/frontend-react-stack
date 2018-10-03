import { connect } from "react-redux";
import GameTile2 from "Components/GameTile2";
import { gameSelector } from "Reducers/schema/selector";

const getGameData = (state, props) => state.schema.game[props.id]; //[]gameSelector(props.id)(state);
const getGameActions = (dispatch, props) => ({
  onLaunchGame: () => dispatch({ type: "##MARKER", slug: props.id }),
});

const GameTileContainer = connect(
  getGameData,
  getGameActions
)(GameTile2);

export default GameTileContainer;

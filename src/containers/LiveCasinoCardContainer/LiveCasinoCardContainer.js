import { connect } from "react-redux";
import LiveCasinoCard from "Components/LiveCasinoCard";
import { trace } from "Utils/utils";

const LiveCasinoCardContainer = connect((state, props) => {
  const game = state.schema.game[props.id];
  const lobby = state.schema.liveTable[game.tableId];

  // TODO: remove these nested components things
  return { game: { ...game, lobby } };
})(LiveCasinoCard);

export default LiveCasinoCardContainer;

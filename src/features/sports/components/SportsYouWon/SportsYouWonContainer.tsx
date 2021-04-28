import { connect } from "react-redux";
import { playerCasumoNameSelector, playerIdSelector } from "Models/handshake";
import { SportsYouWonComponent } from "./SportsYouWonComponent";

export default connect(
  (state, ownProps) => ({
    username: playerCasumoNameSelector(state),
    playerId: playerIdSelector(state),
    ...ownProps,
  }),
  {}
)(SportsYouWonComponent);

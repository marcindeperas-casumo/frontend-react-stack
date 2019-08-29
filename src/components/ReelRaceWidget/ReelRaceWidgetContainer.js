// @flow
import { connect } from "react-redux";
import { initReelRaceWidget } from "Models/reelRaceWidget";
import { ReelRaceWidget } from "./ReelRaceWidget";

export default connect(
  state => ({}),
  dispatch => ({
    initReelRaceWidget: () => dispatch(initReelRaceWidget()),
  })
)(ReelRaceWidget);

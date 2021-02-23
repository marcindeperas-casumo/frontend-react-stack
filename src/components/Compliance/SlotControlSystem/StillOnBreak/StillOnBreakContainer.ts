// @flow
import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { StillOnBreak } from "./StillOnBreak";

export const StillOnBreakContainer = connect(state => ({
  t: configurationFormContentSelector(state),
}))(StillOnBreak);

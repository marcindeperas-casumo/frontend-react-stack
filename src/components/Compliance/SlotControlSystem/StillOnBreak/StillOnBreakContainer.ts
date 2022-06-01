import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { StillOnBreak } from "./StillOnBreak";

export const StillOnBreakContainer = connect(state => ({
  // @ts-expect-error: apply fix if you know the context
  t: configurationFormContentSelector(state),
}))(StillOnBreak);

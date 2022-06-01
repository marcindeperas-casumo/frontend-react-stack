import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { RememberToPlayWithinLimits } from "./RememberToPlayWithinLimits";

export const RememberToPlayWithinLimitsContainer = connect(state => ({
  // @ts-expect-error: apply fix if you know the context
  t: configurationFormContentSelector(state),
}))(RememberToPlayWithinLimits);

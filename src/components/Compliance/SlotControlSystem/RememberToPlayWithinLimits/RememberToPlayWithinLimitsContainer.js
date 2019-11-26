// @flow
import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { RememberToPlayWithinLimits } from "./RememberToPlayWithinLimits";

export const RememberToPlayWithinLimitsContainer = connect(state => ({
  t: configurationFormContentSelector(state),
}))(RememberToPlayWithinLimits);

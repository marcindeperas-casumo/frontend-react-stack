// @flow
import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { NotEnoughFunds } from "./NotEnoughFunds";

export const NotEnoughFundsContainer = connect(state => ({
  t: configurationFormContentSelector(state),
}))(NotEnoughFunds);

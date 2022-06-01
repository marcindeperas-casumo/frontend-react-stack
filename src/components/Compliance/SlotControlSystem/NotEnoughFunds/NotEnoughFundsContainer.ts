import { connect } from "react-redux";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { NotEnoughFunds } from "./NotEnoughFunds";

export const NotEnoughFundsContainer = connect(state => ({
  // @ts-expect-error: apply fix if you know the context
  t: configurationFormContentSelector(state),
}))(NotEnoughFunds);

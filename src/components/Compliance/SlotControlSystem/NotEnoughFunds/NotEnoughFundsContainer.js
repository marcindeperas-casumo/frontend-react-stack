// @flow
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { NotEnoughFunds } from "./NotEnoughFunds";

export const NotEnoughFundsContainer = connect(
  state => ({
    t: {
      ...configurationFormContentSelector(state),
      message: "You don't have enough funds to play with",
      button_label: "Deposit now",
    },
  }),
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    onClick: () => {
      ownProps.onClick();
      setTimeout(
        () =>
          DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
            routeId: "deposit",
          }),
        100
      );
    },
  })
)(NotEnoughFunds);

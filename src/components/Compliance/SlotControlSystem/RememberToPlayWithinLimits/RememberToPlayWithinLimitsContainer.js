// @flow
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { configurationFormContentSelector } from "Models/slotControlSystem";
import { RememberToPlayWithinLimits } from "./RememberToPlayWithinLimits";

export const RememberToPlayWithinLimitsContainer = connect(
  state => ({
    t: configurationFormContentSelector(state),
  }),
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    onClickAbout: () => {
      ownProps.onClickAbout();
      setTimeout(
        () =>
          DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
            routeId: "play-okay",
          }),
        200
      );
    },
  })
)(RememberToPlayWithinLimits);

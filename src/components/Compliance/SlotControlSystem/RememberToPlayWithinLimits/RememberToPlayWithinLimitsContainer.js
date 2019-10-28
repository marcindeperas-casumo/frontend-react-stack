// @flow
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { RememberToPlayWithinLimits } from "./RememberToPlayWithinLimits";

export const RememberToPlayWithinLimitsContainer = connect(
  state => ({}),
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    onClickAbout: () => {
      ownProps.onClickAbout();
      setTimeout(
        () =>
          DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
            routeId: "cms-page",
            params: { slug: "play-okay" },
          }),
        200
      );
    },
  })
)(RememberToPlayWithinLimits);

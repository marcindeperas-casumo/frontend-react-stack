import { navigate } from "@reach/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";

export const BridgeToNavigationService = () => {
  bridge.on(REACT_APP_EVENT_ROUTE_CHANGE, () => {
    const path = window.location.href.replace(window.location.origin, "");

    // In the current implmentation, links clicked on the durandal side
    // seem to be scoped somehow, leaving react unaware that the url has
    // changed. As an initial path to integrate reach router, we are
    // retriggering navigation on the react side to keep everything in
    // sync. `replace` is used to avoid adding another entry to the browser
    // history.

    navigate(path, { replace: true });
  });
};

import { navigate } from "@reach/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";

export const BridgeToNavigationService = () => {
  bridge.on(REACT_APP_EVENT_ROUTE_CHANGE, ({ config, params }) => {
    const { pathname, search } = window.location;

    navigate(`${pathname}${search}`, { replace: true });
  });
};

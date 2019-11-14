import { navigate } from "@reach/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";

export const BridgeToNavigationService = () => {
  bridge.on(REACT_APP_EVENT_ROUTE_CHANGE, ({ config, params }) => {
    const pattern = config.routePattern;
    // eslint-disable-next-line fp/no-let
    let route = config.route
      .split("/")
      .filter(segment => segment)
      .join("/");

    const parameterMatches = [...route.match(pattern)].slice(1);

    params.forEach((param, index) => {
      // eslint-disable-next-line fp/no-mutation
      route = route.replace(parameterMatches[index], param);
    });

    navigate(`/${route}`, { replace: true });
  });
};

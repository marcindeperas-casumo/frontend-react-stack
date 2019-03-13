import { activateComponent } from "Models/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";

export const connect = store => {
  const dispatch = ({ config, params }) =>
    store.dispatch(
      activateComponent({
        componentId: config.id,
        routeParams: params,
      })
    );

  bridge.on(REACT_APP_EVENT_ROUTE_CHANGE, dispatch);
};

export default connect;

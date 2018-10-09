import { actions } from "Reducers/migrationComponents";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../legacyBridge";

export const connect = store => {
  const { dispatch } = store;
  const { on } = bridge;

  on(REACT_APP_EVENT_ROUTE_CHANGE, data => {
    dispatch(actions.activateComponent(data.config.id));
  });
};

export default connect;

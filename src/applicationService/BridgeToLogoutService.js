// @flow
import { appManualLogoutInit } from "Models/app";
import { REACT_APP_EVENT_INIT_MANUAL_LOGOUT } from "../constants";
import bridge from "../DurandalReactBridge";

export const BridgeToLogoutService = (store: Object) => {
  bridge.on(REACT_APP_EVENT_INIT_MANUAL_LOGOUT, () => {
    store.dispatch(appManualLogoutInit());
  });
};

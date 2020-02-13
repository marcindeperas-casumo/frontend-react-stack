// @flow
import { appManualLogoutInit, appAutomaticLogoutInit } from "Models/app";
import {
  REACT_APP_EVENT_INIT_MANUAL_LOGOUT,
  REACT_APP_EVENT_INIT_AUTOMATIC_LOGOUT,
} from "../constants";
import bridge from "../DurandalReactBridge";

export const BridgeToLogoutService = (store: Object) => {
  bridge.on(REACT_APP_EVENT_INIT_MANUAL_LOGOUT, () => {
    store.dispatch(appManualLogoutInit());
  });
  bridge.on(REACT_APP_EVENT_INIT_AUTOMATIC_LOGOUT, () => {
    store.dispatch(appAutomaticLogoutInit());
  });
};

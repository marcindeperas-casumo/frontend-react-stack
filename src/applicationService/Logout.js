// @flow
import { KO_APP_EVENT_LOGOUT } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const logout = () => bridge.emit(KO_APP_EVENT_LOGOUT);

// @flow
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_SHOW_TERMS } from "../constants";

export const showTerms = () => bridge.emit(KO_APP_EVENT_SHOW_TERMS);

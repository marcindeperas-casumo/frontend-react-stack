import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK } from "Src/constants";

export const onOldStackOnCallbackEvent = callback =>
  bridge.on(REACT_APP_EVENT_ON_CALLBACK, callback);

export const offOldStackOnCallbackEvent = callback =>
  bridge.off(REACT_APP_EVENT_ON_CALLBACK, callback);

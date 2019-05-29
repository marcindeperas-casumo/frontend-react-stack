import { repeat } from "ramda";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK } from "Src/constants";

export const onKOEvent = (evt, callback) => {
  bridge.on(REACT_APP_EVENT_ON_CALLBACK, ({ event, data }) => {
    if (evt === event) {
      callback(data);
    }
  });
};

export const PASSWORD_VALUE = repeat(String.fromCharCode(8226), 8);

import { repeat } from "ramda";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK } from "Src/constants";

export const onOldStackEvent = (evt, callback) => {
  bridge.on(REACT_APP_EVENT_ON_CALLBACK, ({ event, data }) => {
    if (evt === event) {
      callback(data);
    }
  });
};

export const PASSWORD_PLACEHOLDER_VALUE = repeat(String.fromCharCode(8226), 8);

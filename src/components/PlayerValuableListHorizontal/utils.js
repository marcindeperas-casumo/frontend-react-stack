import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK } from "Src/constants";

export const onOldStackEvent = (evt, callback) => {
  bridge.on(REACT_APP_EVENT_ON_CALLBACK, ({ event, data }) => {
    if (evt === event) {
      callback(data);
    }
  });
};

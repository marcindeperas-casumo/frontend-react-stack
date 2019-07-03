//@flow
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";

type OnCallbackEvent = {
  event: string,
  data: { success: string },
};

export type ItemCreatedEventWrapperType = OnCallbackEvent => void;

export const subscribeToCallbackEvent = (callback: any => void) =>
  bridge.on(REACT_APP_EVENT_ON_CALLBACK, callback);

export const unsubscribeFromCallbackEvent = (callback: any => void) =>
  bridge.off(REACT_APP_EVENT_ON_CALLBACK, callback);

export const itemCreatedEventWrapper = (
  callback: () => void
): ItemCreatedEventWrapperType => ({ event, data }: OnCallbackEvent) => {
  if (event === KO_EVENTS.VALUABLES.ITEM_CREATED && data.success) {
    callback();
  }
};

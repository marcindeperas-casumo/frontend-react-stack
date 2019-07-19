//@flow
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";

type OnCallbackEvent = {
  event: string,
  data: { success: string },
};

export type ItemCreatedEventHandler = {
  unsubscribe: () => void,
};

export const subscribeToItemCreatedEvent = (
  callback: ({ success: string }) => void
): ItemCreatedEventHandler => {
  const eventWrapper = ({ event, data }: OnCallbackEvent) => {
    if (event === KO_EVENTS.VALUABLES.ITEM_CREATED) {
      callback(data);
    }
  };

  bridge.on(REACT_APP_EVENT_ON_CALLBACK, eventWrapper);

  return {
    unsubscribe: () => bridge.off(REACT_APP_EVENT_ON_CALLBACK, eventWrapper),
  };
};

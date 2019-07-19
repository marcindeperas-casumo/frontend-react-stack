import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { subscribeToItemCreatedEvent } from "./utils";

describe("PlayerValuableListHorizontal/utils", () => {
  describe("subscribeToItemCreatedEvent", () => {
    it("should trigger callback on VALUABLES/ITEM_CREATED event", () => {
      const spy = jest.fn();
      const payload = {
        event: KO_EVENTS.VALUABLES.ITEM_CREATED,
        data: {
          success: true,
        },
      };
      subscribeToItemCreatedEvent(spy);
      bridge.emit(REACT_APP_EVENT_ON_CALLBACK, payload);
      expect(spy).toHaveBeenCalledWith({ success: true });
    });

    it("should not trigger callback after unsubscribing", () => {
      const spy = jest.fn();
      const payload = {
        event: KO_EVENTS.VALUABLES.ITEM_CREATED,
        data: {
          success: true,
        },
      };
      const handler = subscribeToItemCreatedEvent(spy);
      handler.unsubscribe();
      bridge.emit(REACT_APP_EVENT_ON_CALLBACK, payload);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});

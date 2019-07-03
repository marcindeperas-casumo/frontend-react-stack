import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { itemCreatedEventWrapper } from "./utils";

describe("PlayerValuableListHorizontal/utils", () => {
  describe("itemCreatedEventWrapper", () => {
    it("should trigger callback on VALUABLES/ITEM_CREATED event", () => {
      const spy = jest.fn();
      const payload = {
        event: KO_EVENTS.VALUABLES.ITEM_CREATED,
        data: {
          success: true,
        },
      };
      const handler = itemCreatedEventWrapper(spy);
      bridge.on(REACT_APP_EVENT_ON_CALLBACK, handler);
      bridge.emit(REACT_APP_EVENT_ON_CALLBACK, payload);
      expect(spy).toHaveBeenCalled();
    });
  });
});

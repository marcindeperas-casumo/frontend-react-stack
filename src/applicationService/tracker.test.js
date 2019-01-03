import { getTracker } from "./tracker";

describe("Services/Tracker", () => {
  describe("getTracker()", () => {
    let devAdapter;
    let prodAdapter;
    let adapterGetters;

    beforeEach(() => {
      devAdapter = {
        track: jest.fn(),
        setState: jest.fn(),
      };
      prodAdapter = {
        track: jest.fn(),
        setState: jest.fn(),
      };
      adapterGetters = {
        dev: jest.fn().mockReturnValue([devAdapter]),
        prod: jest.fn().mockReturnValue([prodAdapter]),
      };
    });

    test("only calls the adapters specified by the ENV", () => {
      const tracker = getTracker("dev", adapterGetters);

      tracker.track("Event", { foo: "bar" });
      tracker.setState({ bar: "foo" });

      expect(devAdapter.track).toHaveBeenCalledTimes(1);
      expect(devAdapter.setState).toHaveBeenCalledTimes(1);
      expect(prodAdapter.track).toHaveBeenCalledTimes(0);
      expect(prodAdapter.setState).toHaveBeenCalledTimes(0);
    });

    test("doesn't call any adapters if the requested ENV doesn't have adapters", () => {
      const tracker = getTracker("unknown", adapterGetters);

      tracker.track("Event", { foo: "bar" });
      tracker.setState({ bar: "foo" });

      expect(devAdapter.track).toHaveBeenCalledTimes(0);
      expect(devAdapter.setState).toHaveBeenCalledTimes(0);
      expect(prodAdapter.track).toHaveBeenCalledTimes(0);
      expect(prodAdapter.setState).toHaveBeenCalledTimes(0);
    });
  });
});

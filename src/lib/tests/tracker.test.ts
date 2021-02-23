import createTracker from "../tracker";

describe("Lib/Tracker", () => {
  let adapters;
  let tracker;

  beforeEach(() => {
    adapters = [
      {
        init: jest.fn(),
        track: jest.fn(),
        setState: jest.fn(),
      },
      {
        init: jest.fn(),
        track: jest.fn(),
        setState: jest.fn(),
      },
    ];

    tracker = createTracker(adapters);
  });

  describe("track()", () => {
    test("calls the track() method of each adapter", () => {
      const eventName = "event";
      const data = { foo: "bar" };
      const [adapter1, adapter2] = adapters;

      tracker.track(eventName, data);

      expect(adapter1.track).toHaveBeenCalledTimes(1);
      expect(adapter1.track).toHaveBeenCalledWith(eventName, data);

      expect(adapter2.track).toHaveBeenCalledTimes(1);
      expect(adapter2.track).toHaveBeenCalledWith(eventName, data);
    });
  });

  describe("setState()", () => {
    test("calls the setState() method of each adapter", () => {
      const data = { foo: "bar" };
      const [adapter1, adapter2] = adapters;

      tracker.setState(data);

      expect(adapter1.setState).toHaveBeenCalledTimes(1);
      expect(adapter1.setState).toHaveBeenCalledWith(data);

      expect(adapter2.setState).toHaveBeenCalledTimes(1);
      expect(adapter2.setState).toHaveBeenCalledWith(data);
    });
  });
});

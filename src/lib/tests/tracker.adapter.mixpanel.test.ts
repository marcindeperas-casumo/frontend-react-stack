import createAdapter from "../tracker.adapter.mixpanel";

describe("Lib/Tracker.Adapter.Mixpanel", () => {
  let mixpanelAdapter;
  let loadLibrary;
  const config = {
    mixpanelToken: "123",
    mixpanelProjectName: "test",
  };

  beforeEach(() => {
    window.mixpanel = null;
    loadLibrary = jest.fn().mockImplementation(() => {
      window.mixpanel = {
        init: jest.fn(),
        [config.mixpanelProjectName]: {
          track: jest.fn(),
          register: jest.fn(),
        },
      };
    });
    mixpanelAdapter = createAdapter(config, loadLibrary);
  });

  test("tries to load the mixpanel library when creating the adapter", () => {
    expect(loadLibrary).toHaveBeenCalledTimes(1);
  });

  test("initialises mixpanel when creating the adapter", () => {
    const { mixpanelToken, mixpanelProjectName } = config;

    expect(window.mixpanel.init).toHaveBeenCalledTimes(1);
    expect(window.mixpanel.init).toHaveBeenCalledWith(
      mixpanelToken,
      {},
      mixpanelProjectName
    );
  });

  describe("track()", () => {
    test("tracks an event with mixpanel", () => {
      const eventName = "event";
      const data = { foo: "bar" };
      const spy = window.mixpanel[config.mixpanelProjectName].track;

      mixpanelAdapter.track(eventName, data);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(eventName, data);
    });

    test("does not fail if mixpanel is not available", () => {
      const eventName = "event";
      const data = { foo: "bar" };
      loadLibrary = () => {};

      mixpanelAdapter = createAdapter(config, loadLibrary);

      mixpanelAdapter.track(eventName, data);
    });
  });

  describe("setState()", () => {
    test("registers super properties for mixpanel events", () => {
      const data = { foo: "bar" };
      const spy = window.mixpanel[config.mixpanelProjectName].register;

      mixpanelAdapter.setState(data);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(data);
    });

    test("does not fail if mixpanel is not available", () => {
      const data = { foo: "bar" };
      loadLibrary = () => {};

      mixpanelAdapter = createAdapter(config, loadLibrary);

      mixpanelAdapter.setState(data);
    });
  });
});

import { navigate } from "@reach/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";
import { BridgeToNavigationService } from "./BridgeToNavigationService";
jest.mock("../DurandalReactBridge");
jest.mock("@reach/router");

describe("BridgeToNavigationService", () => {
  const { location } = window;

  beforeEach(() => {
    jest.resetAllMocks();

    // eslint-disable-next-line fp/no-delete
    delete window.location;

    window.location = {
      pathname: "/test",
      search: "?myquery",
    };
  });

  afterEach(() => {
    window.location = location;
  });

  test("listen to REACT_APP_EVENT_ROUTE_CHANGE event", () => {
    BridgeToNavigationService();

    expect(bridge.on).toHaveBeenCalledTimes(1);
    expect(bridge.on).toHaveBeenCalledWith(
      REACT_APP_EVENT_ROUTE_CHANGE,
      expect.anything()
    );
  });

  test("callback should call navigate with the processed url", () => {
    BridgeToNavigationService();

    const eventName = bridge.on.mock.calls[0][0];
    const onReactAppEventRouteChange = bridge.on.mock.calls[0][1];

    // Simulating an event (can be any payload as window.location is used anyway)
    onReactAppEventRouteChange({
      config: { route: "/test/:foo", routePattern: /^test\/([^/]+)$/i },
      params: ["bar"],
    });

    expect(eventName).toEqual(REACT_APP_EVENT_ROUTE_CHANGE);
    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/test?myquery", { replace: true });
  });
});

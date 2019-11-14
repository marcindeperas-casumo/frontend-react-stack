import { navigate } from "@reach/router";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";
import bridge from "../DurandalReactBridge";
import { BridgeToNavigationService } from "./BridgeToNavigationService";
jest.mock("../DurandalReactBridge");
jest.mock("@reach/router");

beforeEach(() => {
  jest.resetAllMocks();
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
  expect(eventName).toEqual(REACT_APP_EVENT_ROUTE_CHANGE);

  const callback = bridge.on.mock.calls[0][1];
  const routeParams = ["bar"];

  callback({
    config: { route: "/test/:foo", routePattern: /^test\/([^/]+)$/i },
    params: routeParams,
  });

  expect(navigate).toBeCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith("/test/bar", { replace: true });
});

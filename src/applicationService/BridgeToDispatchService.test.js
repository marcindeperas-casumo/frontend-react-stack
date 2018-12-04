import { activateComponent } from "Models/migrationComponents";
import { connect } from "./BridgeToDispatchService";
import { REACT_APP_EVENT_ROUTE_CHANGE } from "../constants";

import bridge from "../DurandalReactBridge";
jest.mock("../DurandalReactBridge");

beforeEach(() => {
  jest.resetAllMocks();
});

test("listen to REACT_APP_EVENT_ROUTE_CHANGE event", () => {
  const dispatch = jest.fn();
  connect({ dispatch });

  expect(bridge.on).toHaveBeenCalledTimes(1);
  expect(bridge.on).toHaveBeenCalledWith(
    REACT_APP_EVENT_ROUTE_CHANGE,
    expect.anything()
  );
});

test("callback should call dispatch with the event data", () => {
  const dispatch = jest.fn();
  connect({ dispatch });

  const eventName = bridge.on.mock.calls[0][0];
  expect(eventName).toEqual(REACT_APP_EVENT_ROUTE_CHANGE);

  const callback = bridge.on.mock.calls[0][1];
  const routeParams = ["foo"];

  callback({ config: { id: "foo" }, params: routeParams });

  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(
    activateComponent({ componentId: "foo", routeParams })
  );
});

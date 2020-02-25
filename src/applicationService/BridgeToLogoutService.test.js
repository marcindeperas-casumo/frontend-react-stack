// @flow
import { appManualLogoutInit } from "Models/app";
import { REACT_APP_EVENT_INIT_MANUAL_LOGOUT } from "../constants";
import bridge from "../DurandalReactBridge";
import { BridgeToLogoutService } from "./BridgeToLogoutService";
jest.mock("../DurandalReactBridge");

describe("BridgeToLogoutService", () => {
  const mock = (fn: any) => fn;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("listens to REACT_APP_EVENT_INIT_MANUAL_LOGOUT event", () => {
    const dispatch = jest.fn();
    BridgeToLogoutService({ dispatch });

    expect(bridge.on).toHaveBeenCalledTimes(1);
    expect(bridge.on).toHaveBeenCalledWith(
      REACT_APP_EVENT_INIT_MANUAL_LOGOUT,
      expect.anything()
    );
  });

  test("callback should call dispatch with the event data", () => {
    const dispatch = jest.fn();
    BridgeToLogoutService({ dispatch });
    const eventName = mock(bridge.on).mock.calls[0][0];

    expect(eventName).toEqual(REACT_APP_EVENT_INIT_MANUAL_LOGOUT);

    const callback = mock(bridge.on).mock.calls[0][1];

    callback();

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appManualLogoutInit());
  });
});

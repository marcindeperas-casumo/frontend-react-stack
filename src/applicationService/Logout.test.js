import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LOGOUT } from "../constants";
import { logout } from "./Logout";

jest.mock("../DurandalReactBridge");

test("calls emit on the bridge with the correct event", () => {
  logout();

  expect(bridge.emit).toHaveBeenCalledTimes(1);
  expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_LOGOUT);
});

import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_NAVIGATE, KO_APP_EVENT_CHANGE_ROUTE } from "../constants";
import { navigate, navigateById } from "./NavigationService";

jest.mock("../DurandalReactBridge");

describe("navigate()", () => {
  test("calls emit on the bridge with the url", () => {
    const url = "foo-url";

    navigate({ url });

    expect(bridge.emit).toHaveBeenCalledTimes(1);
    expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_NAVIGATE, { url });
  });
});

describe("navigateById()", () => {
  test("calls emit on bridge with routeId and params", () => {
    const routeId = "deposit";

    navigateById({ routeId });

    expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_CHANGE_ROUTE, {
      routeId,
    });
  });
});

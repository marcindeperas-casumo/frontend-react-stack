import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_NAVIGATE } from "../constants";
import { navigate } from "./NavigationService";

jest.mock("../DurandalReactBridge");

test("calls emit on the bridge with the url", () => {
  const url = "foo-url";

  navigate({ url });

  expect(bridge.emit).toHaveBeenCalledTimes(1);
  expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_NAVIGATE, { url });
});

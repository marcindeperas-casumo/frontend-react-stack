import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_SHOW_TERMS } from "../constants";
import { showTerms } from "./ShowTermsService";
jest.mock("../DurandalReactBridge");
test("calls emit on the bridge with the correct event", () => {
  showTerms();
  expect(bridge.emit).toHaveBeenCalledTimes(1);
  expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_SHOW_TERMS);
});

// @flow
import { KO_APP_EVENT_SHOW_BONUS_TERMS } from "Src/constants";
import bridge from "../DurandalReactBridge";
import { launchBonusTermsDialog } from "./LaunchBonusTermsDialog";

jest.mock("../DurandalReactBridge");

describe("LaunchBonusTermsDialog", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("calls emit on the bridge with the launch bonus terms dialog", () => {
    launchBonusTermsDialog();

    expect(bridge.emit).toHaveBeenCalledTimes(1);
    expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_SHOW_BONUS_TERMS);
  });
});

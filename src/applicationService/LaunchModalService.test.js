// @flow
import { KO_APP_EVENT_LAUNCH_MODAL } from "Src/constants";
import bridge from "../DurandalReactBridge";
import { launchModal } from "./LaunchModalService";

jest.mock("../DurandalReactBridge");

test("calls emit on the bridge with the modal and other props", () => {
  const modal = "foo";
  const otherProp = "bar";

  launchModal({ modal, otherProp });

  expect(bridge.emit).toHaveBeenCalledTimes(1);
  expect(bridge.emit).toHaveBeenCalledWith(KO_APP_EVENT_LAUNCH_MODAL, {
    modal,
    otherProp,
  });
});

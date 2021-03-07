import { KO_APP_EVENT_LAUNCH_MODAL, KO_APP_EVENT_LAUNCH_ERROR_MODAL, } from "Src/constants";
import bridge from "../DurandalReactBridge";
import { launchModal, launchErrorModal } from "./LaunchModalService";

jest.mock("../DurandalReactBridge");

describe("LaunchModalService", () => {
    beforeEach(() => {
        // $FlowFixMe
        (bridge as any).emit.mockReset();
    });
    test("calls emit on the bridge with the modal and other props", () => {
        const modal = "foo";
        const otherProp = "bar";
        launchModal({ modal, otherProp });
        expect((bridge as any).emit).toHaveBeenCalledTimes(1);
        expect((bridge as any).emit).toHaveBeenCalledWith(KO_APP_EVENT_LAUNCH_MODAL, {
            modal,
            otherProp,
        });
    });
    test("calls emit on the bridge with the rejectReasonId and status (when provided", () => {
        const rejectReasonId = "foo";
        const status = 123;
        launchErrorModal({ rejectReasonId, status });
        expect((bridge as any).emit).toHaveBeenCalledTimes(1);
        expect((bridge as any).emit).toHaveBeenCalledWith(KO_APP_EVENT_LAUNCH_ERROR_MODAL, {
            rejectReasonId,
            status,
        });
    });
});

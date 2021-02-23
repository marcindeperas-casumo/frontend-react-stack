import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import { launchGame } from "./LaunchGameService";
jest.mock("../DurandalReactBridge");
test("calls emit on the bridge with the slug", () => {
    const slug = "foo-slug";
    launchGame({ slug });
    expect((bridge as any).emit).toHaveBeenCalledTimes(1);
    expect((bridge as any).emit).toHaveBeenCalledWith(KO_APP_EVENT_LAUNCH_GAME, {
        slug,
        playForFun: false,
    });
});

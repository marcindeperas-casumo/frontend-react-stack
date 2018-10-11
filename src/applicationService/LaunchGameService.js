import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";

export const launchGame = ({ slug }) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });

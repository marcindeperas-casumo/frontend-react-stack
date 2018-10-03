import legacyBridge from "../legacyBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";

export const launchGame = ({ slug }) =>
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });

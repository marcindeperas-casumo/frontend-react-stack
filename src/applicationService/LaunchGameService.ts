import { persistVerticalToLocalStorage } from "Utils";
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
export const launchGame = ({
  slug,
  playForFun = false,
}: {
  slug: string;
  playForFun?: boolean;
}) => {
  // TODO: for not-embedded games we can use Utils/nativeBridge here, ommiting KO stack completely
  // Store previous vertical to local storage to redirect user on exit game to previous location
  persistVerticalToLocalStorage();
  return bridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun,
  });
};

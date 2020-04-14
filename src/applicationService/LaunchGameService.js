// @flow
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";

export const launchGame = ({
  slug,
  playForFun = false,
}: {
  slug: string,
  playForFun?: boolean,
}) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun,
  });

// @flow
import { KO_APP_EVENT_LAUNCH_MODAL } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const launchModal = (data: { modal: string }) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_MODAL, data);

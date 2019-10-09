// @flow
import {
  KO_APP_EVENT_LAUNCH_MODAL,
  KO_APP_EVENT_LAUNCH_ERROR_MODAL,
} from "Src/constants";
import bridge from "../DurandalReactBridge";

export const launchModal = (data: { modal: string }) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_MODAL, data);

export const launchErrorModal = (data: {
  rejectReasonId: string,
  status?: number,
}) => bridge.emit(KO_APP_EVENT_LAUNCH_ERROR_MODAL, data);

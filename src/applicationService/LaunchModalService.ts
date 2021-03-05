import {
  KO_APP_EVENT_LAUNCH_MODAL,
  KO_APP_EVENT_LAUNCH_ERROR_MODAL,
  REACT_APP_EVENT_LAUNCH_MODAL,
} from "Src/constants";
import { showModal } from "Models/modal";
import type { ModalId } from "Models/modal";
import bridge from "../DurandalReactBridge";

export const launchModal = (data: { modal: string; otherProp?: any }) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_MODAL, data);
export const launchErrorModal = (data: {
  rejectReasonId: string;
  status?: number;
}) => bridge.emit(KO_APP_EVENT_LAUNCH_ERROR_MODAL, data);
export const bridgeToLaunchModalService = (store: any) => {
  const dispatch = ({ modalId, config }: { modalId: ModalId; config: any }) =>
    store.dispatch(showModal(modalId, config));
  bridge.on(REACT_APP_EVENT_LAUNCH_MODAL, dispatch);
};

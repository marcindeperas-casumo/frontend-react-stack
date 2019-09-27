import { showModal } from "Models/modal";
import { MODALS } from "Models/slotControlSystem";
import bridge from "../DurandalReactBridge";
import { KO_EVENTS, REACT_APP_EVENTS } from "../constants";

export const finishConfiguration = () =>
  bridge.emit(KO_EVENTS.SLOT_CONTROL_SYSTEM.CONFIGURATION_FINISHED);

export const exitConfiguration = () =>
  bridge.emit(KO_EVENTS.SLOT_CONTROL_SYSTEM.CONFIGURATION_EXITED);

export const bridgeToInitConfigurationService = store => {
  bridge.on(REACT_APP_EVENTS.SLOT_CONTROL_SYSTEM.CONFIGURATION_INIT, () => {
    store.dispatch(showModal(MODALS.CONFIGURATION));
  });
};

// @flow
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";

export type ModalId =
  | "REEL_RACES_CAVEATS"
  | "TERMS_AND_CONDITIONS_SPAIN"
  | "SLOT_CONTROL_SYSTEM_CONFIGURATION";
const type = {
  hide: "MODAL/HIDE",
  show: "MODAL/SHOW",
};

type ModalReturnCode =
  | "CLOSED" // click on "x"
  | "ACCEPTED" // click on accept button
  | "DISMISSED"; // click outside of the modal
/*::
// flow magic, with that I can safely use ModalId and ModalReturnCode type
const REACT_APP_MODAL = Object.freeze(require("Src/constants").REACT_APP_MODAL);
(REACT_APP_MODAL.ID: { [ModalId]: ModalId });
(REACT_APP_MODAL.RETURN_CODE: { [ModalReturnCode]: ModalReturnCode });
*/
export type ModalConfig = {
  mustAccept?: boolean,
};
type ModalState = {
  modalId: ModalId | null,
  config: ModalConfig,
};

type ActionType = "MODAL/HIDE" | "MODAL/SHOW";

export function showModal(modalId: ModalId, config: any) {
  return {
    type: type.show,
    modalId,
    config,
  };
}

export function useSelectModal(): ModalState {
  return useSelector(R.prop("modal"), R.eqProps("modalId"));
}

export function hideModal(modalId: ?ModalId) {
  return {
    type: type.hide,
    modalId,
  };
}

export function useHideModal(modalId: ?ModalId) {
  const dispatch = useDispatch();

  return () => dispatch(hideModal(modalId));
}

type Actions = typeof showModal | typeof hideModal;
type Handler = {
  [ActionType]: (state: Array<string>, action: Actions) => ModalState,
};

const handlers: Handler = {
  [type.show]: (state, action) => ({
    modalId: action.modalId,
    config: action.config || {},
  }),
  [type.hide]: state => ({
    modalId: null,
    config: {},
  }),
};
const DEFAULT_STATE = {
  modalId: null,
  config: {},
};
export function modalReducer(
  state: ModalState = DEFAULT_STATE,
  action: Actions
) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

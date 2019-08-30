// @flow
export type ModalKind =
  | "REEL_RACES_CAVEATS"
  | "TERMS_AND_CONDITIONS"
  | "TERMS_AND_CONDITIONS_SPAIN"
  | "PRIVACY_NOTICE";

const type = {
  hide: "MODAL/HIDE",
  show: "MODAL/SHOW",
};

export function showModal(kind: ModalKind) {
  return {
    type: type.show,
    kind,
  };
}

export function hideModal(kind: ModalKind) {
  return {
    type: type.hide,
    kind,
  };
}

type Actions = typeof showModal | typeof hideModal;
type Handler = {
  [string]: (state: Array<string>, action: Actions) => ?ModalKind,
};

const handlers: Handler = {
  [type.show]: (state, action) => action.kind,
  [type.hide]: state => null,
};

export function modalReducer(state: ?ModalKind = null, action: Actions) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

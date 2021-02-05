// @flow
export const ACTION_TYPES = {
  PUSH: "[QUEUE] PUSH",
  POP: "[QUEUE] POP",
  SHIFT: "[QUEUE] SHIFT",
  UNSHIFT: "[QUEUE] UNSHIFT",
  CLEAR: "[QUEUE] CLEAR",
};

// TODO: Define payload typings
type TPushAction = {
  type: ACTION_TYPES.PUSH,
  payload: {},
};
// TODO: Define payload typings
type TPopAction = {
  type: ACTION_TYPES.POP,
  payload: {},
};
// TODO: Define payload typings
type TShiftAction = {
  type: ACTION_TYPES.SHIFT,
  payload: {},
};
// TODO: Define payload typings
type TUnshiftAction = {
  type: ACTION_TYPES.UNSHIFT,
  payload: {},
};

export type TQueueAction =
  | TPushAction
  | TPopAction
  | TShiftAction
  | TUnshiftAction;

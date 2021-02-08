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
  type: typeof ACTION_TYPES.PUSH,
  payload: {},
};
// TODO: Define payload typings
type TPopAction = {
  type: typeof ACTION_TYPES.POP,
  payload: {},
};
// TODO: Define payload typings
type TShiftAction = {
  type: typeof ACTION_TYPES.SHIFT,
  payload: {},
};
// TODO: Define payload typings
type TUnshiftAction = {
  type: typeof ACTION_TYPES.UNSHIFT,
  payload: {},
};

export type TQueueAction =
  | TPushAction
  | TPopAction
  | TShiftAction
  | TUnshiftAction;

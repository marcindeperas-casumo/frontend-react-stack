// @flow
import type {
  TComponentQueueItemContent,
  TComponentQueueState,
} from "./ComponentQueue.types";

export const ACTION_TYPES = {
  PUSH: "[QUEUE] PUSH",
  POP: "[QUEUE] POP",
  SHIFT: "[QUEUE] SHIFT",
  UNSHIFT: "[QUEUE] UNSHIFT",
  CLEAR: "[QUEUE] CLEAR",
};

type TPushAction = {
  type: typeof ACTION_TYPES.PUSH,
  payload: TComponentQueueItemContent,
  settings: Object,
};

type TPopAction = {|
  type: typeof ACTION_TYPES.POP,
|};

type TShiftAction = {|
  type: typeof ACTION_TYPES.SHIFT,
|};

type TUnshiftAction = {|
  type: typeof ACTION_TYPES.UNSHIFT,
  payload: TComponentQueueItemContent,
  settings: Object,
|};

type TClearAction = {|
  type: typeof ACTION_TYPES.CLEAR,
|};

export type TQueueAction =
  | TPushAction
  | TPopAction
  | TShiftAction
  | TUnshiftAction
  | TClearAction;

export type TQueueApi = (
  state: TComponentQueueState,
  action: TQueueAction
) => TComponentQueueState;

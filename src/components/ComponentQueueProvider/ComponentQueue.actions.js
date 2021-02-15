// @flow
import type { Element } from "react";
import type { TComponentQueueState } from "./ComponentQueue.types";

export const ACTION_TYPES = {
  PUSH: "[QUEUE] PUSH",
  POP: "[QUEUE] POP",
  SHIFT: "[QUEUE] SHIFT",
  UNSHIFT: "[QUEUE] UNSHIFT",
  CLEAR: "[QUEUE] CLEAR",
};

export type TQueueActionPayload = string | (() => Element<*>);

type TPushAction = {
  type: typeof ACTION_TYPES.PUSH,
  payload: TQueueActionPayload,
  settings?: TComponentQueueConfigSettings,
};

type TPopAction = {|
  type: typeof ACTION_TYPES.POP,
|};

type TShiftAction = {|
  type: typeof ACTION_TYPES.SHIFT,
|};

type TUnshiftAction = {|
  type: typeof ACTION_TYPES.UNSHIFT,
  payload: TQueueActionPayload,
  settings?: TComponentQueueConfigSettings,
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

export type TQueueReducer = (
  state: TComponentQueueState,
  action: TQueueAction
) => TComponentQueueState;

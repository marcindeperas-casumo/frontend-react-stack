// @flow
import type { Element } from "react";
import { ACTION_TYPES } from "./ComponentQueue.constants";
import type {
  TComponentQueueState,
  TComponentQueueConfigSettings,
} from "./ComponentQueue.types";

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

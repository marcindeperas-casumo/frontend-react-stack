import * as React from "react";
import { ACTION_TYPES } from "./componentQueue.constants";
import type {
  TComponentQueueState,
  TComponentQueueConfigSettings,
} from "./componentQueue.types";

export type TQueueActionPayload = string | (() => React.ReactNode);

type TPushAction = {
  type: typeof ACTION_TYPES.PUSH;
  payload: TQueueActionPayload;
  settings?: TComponentQueueConfigSettings;
};

type TPopAction = {
  type: typeof ACTION_TYPES.POP;
};

type TShiftAction = {
  type: typeof ACTION_TYPES.SHIFT;
};

type TUnshiftAction = {
  type: typeof ACTION_TYPES.UNSHIFT;
  payload: TQueueActionPayload;
  settings?: TComponentQueueConfigSettings;
};

type TClearAction = {
  type: typeof ACTION_TYPES.CLEAR;
};

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

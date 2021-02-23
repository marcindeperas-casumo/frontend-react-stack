import * as React from "react";
import type { TQueueActionPayload } from "./componentQueue.actions";
import { DATA_STRUCTURE } from "./componentQueue.constants";

export type TDataStructure = typeof DATA_STRUCTURE[keyof typeof DATA_STRUCTURE];

export type TComponentQueueItemContent = string | (() => React.ReactElement);

export type TComponentQueueConfigSettings = {
  priority?: number,
  closeCurrent?: boolean,
};

export type TComponentQueueItem = {
  component: TComponentQueueItemContent,
  settings?: TComponentQueueConfigSettings,
};

export type TComponentQueueConfig = {
  [s: string]: TComponentQueueItem,
};

export type TComponentQueueState = Array<TComponentQueueItem>;

export type TComponentQueueHookParameters = {
  config: TComponentQueueConfig,
  defaultSettings?: Object,
  dataStructure?: TDataStructure,
};

export type TComponentQueueHookState = {
  show: (payload: TQueueActionPayload, settings: Object) => void,
  close: () => void,
  closeAll: () => void,
  current: TComponentQueueItem | null,
  queue: TComponentQueueState,
};

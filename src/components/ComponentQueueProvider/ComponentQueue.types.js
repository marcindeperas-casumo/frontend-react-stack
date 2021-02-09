// @flow
import type { Node } from "react";

export const DATA_STRUCTURE = {
  QUEUE: "QUEUE",
  STACK: "STACK",
};

export type TDataStructure = $Values<typeof DATA_STRUCTURE>;

export type TComponentQueueItemContent = string | (() => Node);

export type TComponentQueueConfigSettings = {
  priority?: number,
  closeCurrent?: boolean,
};

export type TComponentQueueItem = {
  component: TComponentQueueItemContent,
  settings?: TComponentQueueConfigSettings,
};

export type TComponentQueueMapping<T> = $ObjMap<
  T,
  <P>(P) => TComponentQueueItem
>;

export type TComponentQueueConfig = {
  [string]: TComponentQueueItem,
};

export type TComponentQueueState = Array<TComponentQueueItem>;

export type TComponentQueueHookParameters = {
  config: TComponentQueueConfig,
  defaultSettings?: Object,
  dataStructure?: TDataStructure,
};

export type TComponentQueueHookState = {
  show: (payload: TComponentQueueItemContent, settings: Object) => void,
  close: () => void,
  closeAll: () => void,
  current: TComponentQueueItem | null,
  queue: TComponentQueueState,
};

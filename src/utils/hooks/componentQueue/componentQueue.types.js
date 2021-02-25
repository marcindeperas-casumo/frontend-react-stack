// @flow
import type { Element } from "react";
import type { TQueueActionPayload } from "./componentQueue.actions";
import { DATA_STRUCTURE } from "./componentQueue.constants";

export type TDataStructure = $Values<typeof DATA_STRUCTURE>;

export type TComponentQueueItemContent = string | (() => Element<*>);

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
  show: (payload: TQueueActionPayload, settings: Object) => void,
  close: () => void,
  closeAll: () => void,
  current: TComponentQueueItem | null,
  queue: TComponentQueueState,
};

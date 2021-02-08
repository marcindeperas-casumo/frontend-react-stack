// @flow
import { Node } from "react";

export const DATA_STRUCTURE = {
  QUEUE: "QUEUE",
  STACK: "STACK",
};

export type TDataStructure = $Values<typeof DATA_STRUCTURE>;

export type TComponentQueueContent = string | (() => Node);

export type TComponentQueueConfigSettings = {
  priority?: number,
  closeCurrent?: boolean,
};

export type TComponentQueueConfigMap = {
  component: TComponentQueueContent,
  settings?: TComponentQueueConfigSettings,
};

export type TComponentQueueParameters = {
  config: Object,
  defaultSetttings?: TComponentQueueConfigSettings,
  dataStructure?: TDataStructure,
};

export type TComponentQueueHookState = {
  show: () => void,
  close: () => void,
  localContent: any,
  queue: Array<any>,
};

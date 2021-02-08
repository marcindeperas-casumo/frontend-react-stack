// @flow
import React, { useState, useReducer, useEffect } from "react";
import { queueReducer } from "./ComponentQueue.reducer";
import { ACTION_TYPES, TQueueAction } from "./ComponentQueue.actions";

export const DATA_STRUCTURE = {
  QUEUE: "QUEUE",
  STACK: "STACK",
};

type TDispatch = (action: TQueueAction) => void;

export type TDataStructure = $Values<typeof DATA_STRUCTURE>;

export type TComponentQueueConfigSettings = {
  priority?: number,
  closeCurrent?: boolean,
};

export type TComponentQueueConfigMap = {
  component: string | (() => React.Node),
  settings?: TComponentQueueConfigSettings,
};

export type TComponentQueueParameters = {
  config: TComponentQueueConfigMap,
  defaultSetttings?: TComponentQueueConfigSettings,
  dataStructure?: TDataStructure,
};

export type TComponentQueueState = {
  show: () => void,
  close: () => void,
  localContent: any,
  queue: Array<any>,
};

export const useComponentQueueState = ({
  config,
  defaultSettings = {},
  dataStructure = DATA_STRUCTURE.QUEUE,
}: TComponentQueueParameters): TComponentQueueState => {
  const isQueue = dataStructure === DATA_STRUCTURE.QUEUE;
  const [localContent, setContent] = useState(null);
  const reducerWithConfig = queueReducer(config, defaultSettings);
  const [queue: Array<any>, dispatch: TDispatch] = useReducer(
    reducerWithConfig,
    []
  );

  const queueAdd = (content: any, settings: any) => {
    dispatch({
      type: ACTION_TYPES.PUSH,
      payload: content,
      settings,
    });
  };

  const queueRemove = (settings: any) => {
    dispatch({
      type: ACTION_TYPES.SHIFT,
      settings,
    });
  };

  const stackAdd = (content: any, settings: any) => {
    dispatch({
      type: ACTION_TYPES.UNSHIFT,
      payload: content,
      settings,
    });
  };

  const stackRemove = (settings: any) => {
    dispatch({
      type: ACTION_TYPES.POP,
      settings,
    });
  };

  const closeAll = () => {
    dispatch({
      type: ACTION_TYPES.CLEAR,
    });
  };

  const queueDispatch = { show: queueAdd, close: queueRemove, closeAll };
  const stackDispatch = { show: stackAdd, close: stackRemove, closeAll };
  const reducerDispatch = isQueue ? queueDispatch : stackDispatch;

  useEffect(() => {
    if (queue.length) {
      // Stack pointer is at the top
      // Queue pointer is at the beginning
      const pointer = isQueue ? 0 : queue.length - 1;
      setContent(queue[pointer]);
    } else {
      setContent(null);
    }
  }, [queue, isQueue]);

  return {
    ...reducerDispatch,
    localContent,
    queue,
  };
};

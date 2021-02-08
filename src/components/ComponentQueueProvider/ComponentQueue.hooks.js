// @flow
import { useState, useReducer, useEffect } from "react";
import { queueReducer } from "./ComponentQueue.reducer";
import { ACTION_TYPES } from "./ComponentQueue.actions";

export const DataStructure = {
  QUEUE: "QUEUE",
  STACK: "STACK",
};

export type TDataStructure = $Values<typeof DATA_STRUCTURE>;

export type TComponentQueueConfigSettings = {
  priority?: number,
  closeCurrent?: boolean,
};

export type TComponentQueueConfigMap = {
  component: string | (() => React.Node),
  settings?: TComponentQueueConfigSettings,
};

export type TComponentQueueHoookParameters = {
  config: TComponentQueueConfigMap,
  defaultSetttings?: TComponentQueueConfigSettings,
  dataStructure?: TDataStructure,
};

export const useComponentQueueState = ({
  config,
  defaultSettings = {},
  dataStructure = DataStructure.QUEUE,
}: TComponentQueueParameters) => {
  const isQueue = dataStructure === DataStructure.QUEUE;
  const [localContent, setContent] = useState(null);
  const reducerWithConfig = queueReducer(config, defaultSettings);
  const [queue, dispatch] = useReducer(reducerWithConfig, []);

  const queueAdd = (content, settings) => {
    dispatch({
      type: ACTION_TYPES.PUSH,
      payload: content,
      settings,
    });
  };

  const queueRemove = settings => {
    dispatch({
      type: ACTION_TYPES.SHIFT,
      settings,
    });
  };

  const stackAdd = (content, settings) => {
    dispatch({
      type: ACTION_TYPES.UNSHIFT,
      payload: content,
      settings,
    });
  };

  const stackRemove = settings => {
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

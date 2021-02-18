// @flow
import { useState, useReducer, useEffect } from "react";
import { queueReducer } from "./ComponentQueue.reducer";
import { ACTION_TYPES, DATA_STRUCTURE } from "./ComponentQueue.constants";
import type { TQueueActionPayload } from "./ComponentQueue.actions";
import type {
  TComponentQueueItem,
  TComponentQueueHookState,
  TComponentQueueConfigSettings,
  TComponentQueueHookParameters,
} from "./ComponentQueue.types";

export const useComponentQueueState = ({
  config,
  defaultSettings = {},
  dataStructure = DATA_STRUCTURE.QUEUE,
}: TComponentQueueHookParameters): TComponentQueueHookState => {
  const isQueue = dataStructure === DATA_STRUCTURE.QUEUE;
  const [current, setCurrent] = useState<TComponentQueueItem | null>(null);
  const reducerWithConfig = queueReducer(config, defaultSettings);
  const [queue, dispatch] = useReducer(reducerWithConfig, []);

  const queueAdd = (
    payload: TQueueActionPayload,
    settings: TComponentQueueConfigSettings
  ) => {
    dispatch({
      type: ACTION_TYPES.PUSH,
      payload,
      settings,
    });
  };

  const queueRemove = () => {
    dispatch({
      type: ACTION_TYPES.SHIFT,
    });
  };

  const stackAdd = (
    payload: TQueueActionPayload,
    settings: TComponentQueueConfigSettings
  ) => {
    dispatch({
      type: ACTION_TYPES.UNSHIFT,
      payload,
      settings,
    });
  };

  const stackRemove = () => {
    dispatch({
      type: ACTION_TYPES.POP,
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
      setCurrent(queue[pointer]);
    } else {
      setCurrent(null);
    }
  }, [queue, isQueue]);

  return {
    ...reducerDispatch,
    current,
    queue,
  };
};

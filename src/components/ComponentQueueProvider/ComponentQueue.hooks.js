// @flow
import { useState, useReducer, useEffect, Reducer } from "react";
import { queueReducer } from "./ComponentQueue.reducer";
import { ACTION_TYPES, type TQueueAction } from "./ComponentQueue.actions";
import {
  DATA_STRUCTURE,
  type TComponentQueueContent,
  type TComponentQueueHookState,
  type TComponentQueueConfigSettings,
  type TComponentQueueParameters,
} from "./ComponentQueue.types";

type TDispatch = (action: TQueueAction) => void;

export const useComponentQueueState = ({
  config,
  defaultSettings = {},
  dataStructure = DATA_STRUCTURE.QUEUE,
}: TComponentQueueParameters): TComponentQueueHookState => {
  const isQueue = dataStructure === DATA_STRUCTURE.QUEUE;
  const [localContent, setContent] = useState(null);
  const reducerWithConfig = queueReducer(config, defaultSettings);
  const [queue: Array<any>, dispatch: TDispatch] = useReducer<
    Reducer<Array<any>, TQueueAction>
  >(reducerWithConfig, []);

  const queueAdd = (
    content: TComponentQueueContent,
    settings: TComponentQueueConfigSettings
  ) => {
    dispatch({
      type: ACTION_TYPES.PUSH,
      payload: content,
      settings,
    });
  };

  const queueRemove = (settings: TComponentQueueConfigSettings) => {
    dispatch({
      type: ACTION_TYPES.SHIFT,
      settings,
    });
  };

  const stackAdd = (
    content: TComponentQueueContent,
    settings: TComponentQueueConfigSettings
  ) => {
    dispatch({
      type: ACTION_TYPES.UNSHIFT,
      payload: content,
      settings,
    });
  };

  const stackRemove = (settings: TComponentQueueConfigSettings) => {
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

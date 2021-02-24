// @flow
import { useReducer, useCallback } from "react";
import { queueReducer } from "./ComponentQueue.reducer";
import { ACTION_TYPES, DATA_STRUCTURE } from "./ComponentQueue.constants";
import type { TQueueActionPayload } from "./ComponentQueue.actions";
import type {
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
  const reducerWithConfig = queueReducer(config, defaultSettings);
  const [queue, dispatch] = useReducer(reducerWithConfig, []);

  const queueAdd = useCallback(
    (payload: TQueueActionPayload, settings: TComponentQueueConfigSettings) => {
      dispatch({
        type: ACTION_TYPES.PUSH,
        payload,
        settings,
      });
    },
    [dispatch]
  );

  const queueRemove = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.SHIFT,
    });
  }, [dispatch]);

  const stackAdd = useCallback(
    (payload: TQueueActionPayload, settings: TComponentQueueConfigSettings) => {
      dispatch({
        type: ACTION_TYPES.UNSHIFT,
        payload,
        settings,
      });
    },
    [dispatch]
  );

  const stackRemove = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.POP,
    });
  }, [dispatch]);

  const closeAll = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.CLEAR,
    });
  }, [dispatch]);

  const queueDispatch = { show: queueAdd, close: queueRemove, closeAll };
  const stackDispatch = { show: stackAdd, close: stackRemove, closeAll };
  const reducerDispatch = isQueue ? queueDispatch : stackDispatch;

  return {
    ...reducerDispatch,
    current: queue.length ? queue[isQueue ? 0 : queue.length - 1] : null,
    queue,
  };
};

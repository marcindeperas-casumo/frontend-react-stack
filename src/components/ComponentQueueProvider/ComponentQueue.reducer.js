// @flow
import {
  ACTION_TYPES,
  type TQueueReducer,
  type TQueueAction,
} from "./ComponentQueue.actions";
import type {
  TComponentQueueItem,
  TComponentQueueState,
  TComponentQueueConfig,
} from "./ComponentQueue.types";
import { bubbleSort } from "./ComponentQueue.utils";

const sortKeyPath = ["settings", "priority"];

const pushOrReplace = (
  state: TComponentQueueState,
  item: TComponentQueueItem
): TComponentQueueState => {
  if (item.settings?.priority && item.settings?.closeCurrent) {
    return bubbleSort([...state.slice(1), item]);
  }

  if (item.settings?.priority) {
    // we need to exclude current from sort
    const current = state[0];
    const sortSkippedCurrent = bubbleSort([...state.slice(1), item]);
    return [current, ...sortSkippedCurrent];
  }

  if (item.settings?.closeCurrent) {
    return [...state.slice(1), item];
  }

  return [...state, item];
};

const unshiftOrReplace = (
  state: TComponentQueueState,
  item: TComponentQueueItem
): TComponentQueueState => {
  if (item.settings?.priority) {
    return bubbleSort([...state, item], sortKeyPath, true);
  }

  if (item.settings?.closeCurrent) {
    return [item, ...state.slice(0, -1)];
  }
  return [item, ...state];
};

/* eslint-disable no-switch-statements/no-switch  */
export const queueReducer = (
  mapping: TComponentQueueConfig,
  defaultSettings: Object = {}
): TQueueReducer => {
  return (state: TComponentQueueState, action: TQueueAction) => {
    /* eslint-disable fp/no-let */
    let configSettings, settings, component;
    /* eslint-enable fp/no-let */
    switch (action.type) {
      case ACTION_TYPES.PUSH:
        /* eslint-disable fp/no-mutation */
        configSettings =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.settings) ||
          {};

        settings = {
          ...defaultSettings,
          ...configSettings,
          ...(action.settings || {}),
        };
        // get component by ID or inline
        component =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.component) ||
          action.payload;
        /* eslint-enable fp/no-mutation */
        return pushOrReplace(state, { settings, component });
      case ACTION_TYPES.SHIFT:
        return state.slice(1);
      case ACTION_TYPES.POP:
        return state.slice(0, -1);
      case ACTION_TYPES.UNSHIFT:
        /* eslint-disable fp/no-mutation */
        configSettings =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.settings) ||
          {};

        settings = {
          ...defaultSettings,
          ...configSettings,
          ...(action.settings || {}),
        };
        // get component by ID or inline
        component =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.component) ||
          action.payload;
        /* eslint-enable fp/no-mutation */
        return unshiftOrReplace(state, {
          settings,
          component,
        });

      default:
        return state;
    }
  };
};
/* eslint-enable no-switch-statements/no-switch */

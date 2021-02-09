/* eslint-disable no-switch-statements/no-switch */
// @flow
import {
  ACTION_TYPES,
  type TQueueApi,
  type TQueueAction,
} from "./ComponentQueue.actions";
import type {
  TComponentQueueConfig,
  TComponentQueueState,
} from "./ComponentQueue.types";
import { bubbleSort } from "./ComponentQueue.utils";

const sortKeyPath = ["settings", "priority"];

const pushOrReplace = (state, item) => {
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

const unshiftOrReplace = (state, item) => {
  if (item.settings?.priority) {
    return bubbleSort([...state, item], sortKeyPath, true);
  }

  if (item.settings?.closeCurrent) {
    return [item, ...state.slice(0, -1)];
  }
  return [item, ...state];
};
const requiresMapping = payload => typeof payload === "string";

const getQueueItem = (mapping, defaultSettings, action) => {
  const settings = {
    ...defaultSettings,
    ...(mapping[action.payload]?.settings || {}),
    ...(action.settings || {}),
  };
  // get component by ID or inline
  const component =
    (requiresMapping(action.payload) && mapping[action.payload]?.component) ||
    action.payload;

  return { component, settings };
};

export const queueReducer = (
  mapping: TComponentQueueConfig,
  defaultSettings: Object = {}
): TQueueApi => {
  return (state: TComponentQueueState, action: TQueueAction) => {
    switch (action.type) {
      case ACTION_TYPES.PUSH:
        const itemToPush = getQueueItem(mapping, defaultSettings, action);
        return pushOrReplace(state, itemToPush);
      case ACTION_TYPES.SHIFT:
        return state.slice(1);
      case ACTION_TYPES.POP:
        return state.slice(0, -1);
      case ACTION_TYPES.UNSHIFT:
        const itemToUnshift = getQueueItem(mapping, defaultSettings, action);
        return unshiftOrReplace(state, itemToUnshift);

      default:
        return state;
    }
  };
};

/* eslint-enable no-switch-statements/no-switch */

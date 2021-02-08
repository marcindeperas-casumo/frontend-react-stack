/* eslint-disable no-switch-statements/no-switch */
// @flow
import { ACTION_TYPES, TQueueAction } from "./ComponentQueue.actions";
import type { TComponentQueueConfigSettings } from "./ComponentQueue.types";
import { bubbleSort } from "./ComponentQueue.utils";

const sortKeyPath = ["settings", "priority"];

const pushOrReplace = (state, item) => {
  if (item.settings?.priority && item.settings?.replaceCurrent) {
    return bubbleSort([...state.slice(1), item]);
  }

  if (item.settings?.priority) {
    // we need to exclude current from sort
    const current = state[0];
    const sortSkippedCurrent = bubbleSort([...state.slice(1), item]);
    return [current, ...sortSkippedCurrent];
  }

  if (item.settings?.replaceCurrent) {
    return [...state.slice(1), item];
  }

  return [...state, item];
};

const unshiftOrReplace = (state, item) => {
  if (item.settings?.priority) {
    return bubbleSort([...state, item], sortKeyPath, true);
  }

  if (item.settings?.replaceCurrent) {
    return [item, ...state.slice(0, -1)];
  }
  return [item, ...state];
};
const requiresMapping = payload => typeof payload === "string";

export const queueReducer = (
  mapping: Object,
  defaultSettings: TComponentQueueConfigSettings = {}
) => {
  return (state: Array<any>, action: TQueueAction) => {
    const configSettings = {
      ...(mapping[action.payload]?.settings || {}),
      ...action.settings,
    };

    // get component by ID or inline
    const component =
      (requiresMapping(action.payload) && mapping[action.payload]?.component) ||
      action.payload;

    const settings = {
      ...defaultSettings,
      ...configSettings,
    };

    switch (action.type) {
      case ACTION_TYPES.PUSH:
        return pushOrReplace(state, { component, settings });
      case ACTION_TYPES.SHIFT:
        return state.slice(1);
      case ACTION_TYPES.POP:
        return state.slice(0, -1);
      case ACTION_TYPES.UNSHIFT:
        return unshiftOrReplace(state, { component, settings });

      default:
        return state;
    }
  };
};

/* eslint-enable no-switch-statements/no-switch */

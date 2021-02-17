// @flow
import { ACTION_TYPES } from "./ComponentQueue.constants";
import type { TQueueReducer, TQueueAction } from "./ComponentQueue.actions";
import type {
  TComponentQueueItem,
  TComponentQueueState,
  TComponentQueueConfig,
} from "./ComponentQueue.types";
import { sortByPriority } from "./ComponentQueue.utils";

const pushOrReplace = (
  state: TComponentQueueState,
  item: TComponentQueueItem
): TComponentQueueState => {
  if (item.settings?.priority && item.settings?.closeCurrent) {
    // eslint-disable-next-line fp/no-mutating-methods
    return [...state.slice(1), item].sort(sortByPriority);
    // eslint-enable-next-line fp/no-mutating-methods
  }

  if (item.settings?.priority) {
    // we need to exclude current from sort
    const current = state[0];
    // eslint-disable-next-line fp/no-mutating-methods
    const sortSkippedCurrent = [...state.slice(1), item].sort(sortByPriority);
    // eslint-enable-next-line fp/no-mutating-methods
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
    // eslint-disable-next-line fp/no-mutating-methods
    return [...state, item].sort(sortByPriority).reverse();
    // eslint-enable-next-line fp/no-mutating-methods
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

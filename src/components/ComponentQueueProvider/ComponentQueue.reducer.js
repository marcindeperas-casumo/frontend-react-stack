/* eslint-disable no-switch-statements/no-switch */
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

// const getQueueItem = (
//   mapping: TComponentQueueConfig,
//   defaultSettings: Object,
//   action: TQueueAction
// ): TComponentQueueItem => {
//   const settings = {
//     ...defaultSettings,
//     ...(mapping[action.payload]?.settings || {}),
//     ...(action.settings || {}),
//   };
//   // get component by ID or inline
//   const component =
//     (requiresMapping(action.payload) && mapping[action.payload]?.component) ||
//     action.payload;

//   return { component, settings };
// };

export const queueReducer = (
  mapping: TComponentQueueConfig,
  defaultSettings: Object = {}
): TQueueReducer => {
  return (state: TComponentQueueState, action: TQueueAction) => {
    switch (action.type) {
      case ACTION_TYPES.PUSH:
        const configSettings =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.settings) ||
          {};

        const settings = {
          ...defaultSettings,
          ...configSettings,
          ...(action.settings || {}),
        };
        // get component by ID or inline
        const component =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.component) ||
          action.payload;

        return pushOrReplace(state, { settings, component });
      case ACTION_TYPES.SHIFT:
        return state.slice(1);
      case ACTION_TYPES.POP:
        return state.slice(0, -1);
      case ACTION_TYPES.UNSHIFT:
        const configSettings2 =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.settings) ||
          {};

        const settings2 = {
          ...defaultSettings,
          ...configSettings2,
          ...(action.settings || {}),
        };
        // get component by ID or inline
        const component2 =
          (typeof action.payload === "string" &&
            mapping[action.payload]?.component) ||
          action.payload;
        return unshiftOrReplace(state, {
          settings: settings2,
          component: component2,
        });

      default:
        return state;
    }
  };
};

/* eslint-enable no-switch-statements/no-switch */

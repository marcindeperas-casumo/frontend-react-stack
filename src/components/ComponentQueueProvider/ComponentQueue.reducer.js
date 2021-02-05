/* eslint-disable no-switch-statements/no-switch */
// @flow
import { ACTION_TYPES } from "./ComponentQueue.actions";
import { bubbleSort } from "./ComponentQueue.utils";

const sortKeyPath = ["settings", "priority"];

const pushOrReplace = (state, item) => {
  if (item.settings?.priority) {
    return bubbleSort([...state, item], sortKeyPath);
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

export const queueReducer = (mapping, defaultSettings = {}) => {
  return (state, action) => {
    const settings = {
      ...defaultSettings,
      ...action.settings,
    };

    const component = mapping[action.payload]?.component || action.payload;

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

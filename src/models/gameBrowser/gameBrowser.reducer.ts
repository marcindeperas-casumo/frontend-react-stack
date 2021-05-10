import type { Action } from "./gameBrowser.actions";

const DEFAULT_STATE = {
  page: "top",
  scroll: 0,
  data: {},
};
type State = { [k: string]: typeof DEFAULT_STATE };

export function gameBrowserReducer(state: State = {}, action: Action): State {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (action.type) {
    case "SET_SCROLL_POSITION":
      return {
        ...state,
        [action.path]: {
          ...DEFAULT_STATE,
          ...((state || {})[action.path] || {}),
          scroll: action.scroll,
        },
      };
    case "SET_DATA":
      return {
        ...state,
        [action.path]: {
          ...DEFAULT_STATE,
          ...((state || {})[action.path] || {}),
          page: action.page,
          data: action.data,
        },
      };
    default:
      return state;
  }
}

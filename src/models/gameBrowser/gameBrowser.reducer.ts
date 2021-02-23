// @flow
import type { Action } from "./gameBrowser.actions";

const DEFAULT_STATE = {
  page: "top",
  scroll: 0,
  data: {},
};
type State = typeof DEFAULT_STATE;

export function gameBrowserReducer(
  state: State = DEFAULT_STATE,
  action: Action
): State {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (action.type) {
    case "SET_SCROLL_POSITION":
      return {
        ...state,
        scroll: action.scroll,
      };
    case "SET_DATA":
      return {
        ...state,
        page: action.page,
        data: action.data,
      };
    default:
      return state;
  }
}

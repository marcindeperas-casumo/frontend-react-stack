import { createReducer } from "Utils";
import { types } from "./sidebar.constants";

const DEFAULT_STATE = {
  open: false,
};

const handlers = {
  [types.SIDEBAR_OPEN]: prevState => ({
    ...prevState,
    open: true,
  }),
  [types.SIDEBAR_CLOSED]: prevState => ({
    ...prevState,
    open: false,
  }),
};

export const sidebarReducer = createReducer(DEFAULT_STATE, handlers);

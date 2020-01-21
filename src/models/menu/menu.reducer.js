import { createReducer } from "Utils";
import { types } from "./menu.constants";

const DEFAULT_STATE = {
  open: false,
};

const handlers = {
  [types.MENU_OPEN]: prevState => ({
    ...prevState,
    open: true,
  }),
  [types.MENU_CLOSED]: prevState => ({
    ...prevState,
    open: false,
  }),
};

export const menuReducer = createReducer(DEFAULT_STATE, handlers);

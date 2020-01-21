// @flow
import { types } from "./menu.constants";

export const menuOpenAction = () => ({
  type: types.MENU_OPEN,
});

export const menuCloseAction = () => ({
  type: types.MENU_CLOSED,
});

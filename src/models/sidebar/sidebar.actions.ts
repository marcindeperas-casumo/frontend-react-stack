// @flow
import { types } from "./sidebar.constants";

export const sidebarOpenAction = () => ({
  type: types.SIDEBAR_OPEN,
});

export const sidebarCloseAction = () => ({
  type: types.SIDEBAR_CLOSED,
});

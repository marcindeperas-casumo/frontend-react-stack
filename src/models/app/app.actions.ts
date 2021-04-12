import { types as fetchTypes } from "Models/fetch";
import { commandLogout } from "Api/api.common";
import { types } from "./app.constants";

export const appStarted = () => ({
  type: types.APP_STARTED,
});

export const logout = () => ({
  type: fetchTypes.FETCH,
  name: types.APP_LOGOUT,
  asyncCall: commandLogout,
  asyncCallData: {},
});

export const appManualLogoutInit = () => ({
  type: types.APP_MANUAL_LOGOUT_INIT,
});

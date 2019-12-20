import { types as fetchTypes } from "Models/fetch";
import { commandLogout } from "Api/api.common";
import { types } from "./app.constants";

export const appStarted = () => ({
  type: types.APP_STARTED,
});

export const logout = () => ({
  type: fetchTypes.FETCH,
  name: types.APP_LOGOUT,
  // postFetch: types.CURATED_FETCH_GAME_COMPLETE,
  asyncCall: commandLogout,
  asyncCallData: {},
});

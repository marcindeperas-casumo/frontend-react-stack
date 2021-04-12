import { getCommonHandshake } from "Api/api.common";
import { types as fetchTypes } from "Models/fetch";
import { composePromises } from "Utils";
import { types } from "./handshake.constants";

// This function definitions below (*HandshakeCall) are assigned to their own
// constant so that we can pass them by reference to the actionCreator.
// This will help in testing equality checks of actions creators.
const fetchAppHandshakeCall = composePromises(
  app => ({ app }),
  getCommonHandshake
);

export const fetchAppHandshake = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_APP_HANDSHAKE,
  asyncCall: fetchAppHandshakeCall,
  postFetch: types.UPDATE_HANDSHAKE,
});

export const updateHandshake = response => ({
  type: types.UPDATE_HANDSHAKE,
  response,
});

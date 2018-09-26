import { generalFetch } from "Reducers/fetch";

export const types = {
  FETCH_HANDSHAKE: "HANDSHAKE/FETCH_HANDSHAKE",
  UPDATE_HANDSHAKE: "HANDSHAKE/UPDATE_HANDSHAKE",
};

const apiEndpoints = {
  APP_HANDSHAKE: { url: "common/handshake", method: "GET" },
};

export const fetchHandshake = () =>
  generalFetch(
    types.FETCH_HANDSHAKE,
    apiEndpoints.APP_HANDSHAKE,
    types.UPDATE_HANDSHAKE
  );

export const updateHandshake = response => ({
  type: types.UPDATE_HANDSHAKE,
  response,
});

export const actions = {
  fetchHandshake,
  updateHandshake,
};

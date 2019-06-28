import fetch from "node-fetch";
import fetchDefaults from "fetch-defaults";

export const MOCK_SERVER_PORT = 7777;
const baseUrlFetch = fetchDefaults(
  fetch,
  `http://localhost:${MOCK_SERVER_PORT}/`
);
global.fetch = baseUrlFetch; // eslint-disable-line fp/no-mutation

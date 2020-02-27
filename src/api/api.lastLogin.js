// @flow
import clientHttp from "Lib/http";

export const URL = {
  LAST_LOGINS: "/casino-player/player-login-history/api/history",
};

type HTTPClient = typeof clientHttp;

export const getLastLogins = (http: HTTPClient = clientHttp) =>
  http.get(`${URL.LAST_LOGINS}`);

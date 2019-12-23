// @flow
import http from "Lib/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
  QUERY: "/api/common/query",
  COMMAND: {
    LOGOUT: "/api/common/command/logout",
  },
};

export const getCommonHandshake = (httpService: typeof http = http) =>
  httpService.get(URLS.HANDSHAKE);

export const commandLogout = () => http.post(URLS.COMMAND.LOGOUT);

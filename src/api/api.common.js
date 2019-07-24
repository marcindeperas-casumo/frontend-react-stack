// @flow
import http from "Lib/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
  QUERY: "/api/common/query",
};

export const getCommonHandshake = (httpService: typeof http = http) =>
  httpService.get(URLS.HANDSHAKE);

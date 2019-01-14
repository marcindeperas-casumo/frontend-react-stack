import http from "Lib/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
};

export const getCommonHandshake = (httpService = http) =>
  httpService.get(URLS.HANDSHAKE);

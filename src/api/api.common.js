import http from "Lib/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
};

export const getHandshake = (httpService = http) =>
  httpService.get(URLS.HANDSHAKE);

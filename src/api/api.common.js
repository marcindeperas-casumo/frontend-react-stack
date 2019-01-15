import http from "Services/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
};

export const getCommonHandshake = (httpService = http) =>
  httpService.get(URLS.HANDSHAKE);

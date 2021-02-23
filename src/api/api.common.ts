// @flow
import { getCookie } from "Utils";
import http from "Lib/http";

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
  QUERY: "/api/common/query",
  COMMAND: {
    LOGOUT: "/api/common/command/logout",
  },
};

export const getCommonHandshake = (httpService: typeof http = http) =>
  httpService.post(URLS.HANDSHAKE, {
    referrerUrl: document?.referrer,
    trackingId: getCookie("kazumoTrackingId"),
    url: window?.location.href,
  });

export const commandLogout = () => http.post(URLS.COMMAND.LOGOUT);

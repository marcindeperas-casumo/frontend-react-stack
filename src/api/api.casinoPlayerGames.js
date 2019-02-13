import http from "Services/http";
// TODO remove this once the service is in consul
// only to avoid routing config in test env since it is same origin
import { isEnvProduction } from "Utils";
const baseURL = isEnvProduction()
  ? "https://casino-player.casumotest.com/casino-games/api/v1"
  : "/api/casino-games";

export const getCasinoPlayerGames = ({ page = 1, pageSize = 100 }) => {
  return http.get(`${baseURL}/games`, {
    page,
    pageSize,
  });
};

export const getCasinoPlayerGamesCount = () => {
  return http.get(`${baseURL}/games/count`);
};

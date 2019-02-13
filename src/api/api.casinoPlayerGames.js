import http from "Services/http";

// TODO remove this
const baseURL = "https://casino-player.casumotest.com/casino-games/api/v1/";

export const getCasinoPlayerGames = ({ page = 1, pageSize = 100 }) => {
  return http.get(`${baseURL}/games`, {
    page,
    pageSize,
  });
};

export const getCasinoPlayerGamesCount = () => {
  return http.get(`${baseURL}/count`);
};

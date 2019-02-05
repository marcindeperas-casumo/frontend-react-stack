import http from "Services/http";

export const getCasinoPlayerGames = ({ page = 1, pageSize = 100 }) => {
  return http.get("/api/casino-games/games", {
    page,
    pageSize,
  });
};

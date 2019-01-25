import http from "Services/http";

export const getCasinoPlayerGames = () => {
  return http.get("/api/casino-games/games");
};

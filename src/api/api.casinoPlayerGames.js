import http from "Services/http";

export const getCasinoPlayerGames = () => {
  // const options = sessionId
  //   ? {
  //       headers: {
  //         "X-Token": sessionId,
  //       },
  //     }
  //   : {};
  return http.get("/api/casino-games/games");
};

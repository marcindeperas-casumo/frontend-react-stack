import http from "Services/http";

const url = `/casino-player/casino-games/api/v1`;

export const getCasinoPlayerGames = ({ page = 1, pageSize = 100, sessionId }) =>
  http.get(
    `${url}/games`,
    {
      page,
      pageSize,
    },
    sessionId
      ? {
          headers: {
            "X-Token": sessionId,
          },
        }
      : {}
  );

export const getCasinoPlayerGamesCount = () => {
  return http.get(`${url}/games/count`);
};

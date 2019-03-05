// @flow
import defaultHttp from "Services/http";

type HTTPClient = typeof defaultHttp;

const url = `/casino-player/casino-games/api/v1`;

export const getCasinoPlayerGames = (
  {
    page = 0,
    pageSize = 20,
    sessionId,
  }: {
    page: number,
    pageSize: number,
    sessionId: string,
  },
  http: HTTPClient = defaultHttp
) =>
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

export const getCasinoPlayerGamesCount = (http: HTTPClient = defaultHttp) => {
  return http.get(`${url}/games/count`);
};

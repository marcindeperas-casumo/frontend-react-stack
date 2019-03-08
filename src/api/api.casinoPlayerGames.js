// @flow
import defaultHttp from "Services/http";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: `/casino-player/casino-games/api/v1/games`,
  GAMES_COUNT: `/casino-player/casino-games/api/v1/games/count`,
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

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
    URL.GAMES,
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
  return http.get(URL.GAMES_COUNT);
};

export const getGameProviders = async (http: HTTPClient = defaultHttp) => {
  return await http.get(URL.GAME_PROVIDERS);
};

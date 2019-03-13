// @flow
import defaultHttp from "Services/http";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAMES_COUNT: "/casino-player/casino-games/api/v1/games/count",
  GAME_SEARCH: "/casino-player/casino-games/api/v1/games/search",
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getXTokenHeaders = token =>
  token ? { headers: { "X-Token": token } } : {};

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
    getXTokenHeaders(sessionId)
  );

export const getCasinoPlayerGameSearch = async (
  {
    page = 0,
    pageSize = 20,
    sessionId,
    query,
  }: {
    page: number,
    pageSize: number,
    sessionId: string,
    query: string,
  },
  http: HTTPClient = defaultHttp
) => {
  return await http.get(
    `${URL.GAME_SEARCH}/${query}`,
    {
      page,
      pageSize,
    },
    getXTokenHeaders(sessionId)
  );
};

export const getCasinoPlayerGamesCount = (http: HTTPClient = defaultHttp) => {
  return http.get(URL.GAMES_COUNT);
};

export const getCasinoPlayerGameProviders = async (
  http: HTTPClient = defaultHttp
) => {
  return await http.get(URL.GAME_PROVIDERS);
};

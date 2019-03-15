// @flow
import { join } from "ramda";
import defaultHttp from "Services/http";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: `/casino-player/casino-games/api/v1/games`,
  GAMES_COUNT: `/casino-player/casino-games/api/v1/games/count`,
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getXTokenHeaders = token =>
  token ? { headers: { "X-Token": token } } : {};

export const getCasinoPlayerGames = (
  {
    page = 0,
    pageSize = 20,
    sessionId,
    providers = [],
  }: {
    page: number,
    pageSize: number,
    sessionId: string,
    providers: Array<string>,
  },
  http: HTTPClient = defaultHttp
) =>
  http.get(
    URL.GAMES,
    {
      page,
      pageSize,
      providerSlugs: join(",")(providers),
    },
    getXTokenHeaders(sessionId)
  );

export const getCasinoPlayerGamesCount = (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => http.get(URL.GAMES_COUNT, {}, getXTokenHeaders(sessionId));

export const getGameProviders = async (http: HTTPClient = defaultHttp) => {
  return await http.get(URL.GAME_PROVIDERS);
};

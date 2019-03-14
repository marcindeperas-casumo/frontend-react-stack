// @flow
import { join } from "ramda";
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
    sessionId
      ? {
          headers: {
            "X-Token": sessionId,
          },
        }
      : {}
  );

export const getCasinoPlayerGamesCount = (
  {
    providers = [],
    sessionId,
  }: { providers: Array<string>, sessionId: string },
  http: HTTPClient = defaultHttp
) => {
  return http.get(
    URL.GAMES_COUNT,
    { providerSlugs: join(",")(providers) },
    sessionId
      ? {
          headers: {
            "X-Token": sessionId,
          },
        }
      : {}
  );
};

export const getGameProviders = async (http: HTTPClient = defaultHttp) => {
  return await http.get(URL.GAME_PROVIDERS);
};

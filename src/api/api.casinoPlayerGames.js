// @flow
import defaultHttp from "Services/http";
import { ENTITY_KEYS } from "Models/schema";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: `/casino-player/casino-games/api/v1/games`,
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

export const getCasinoPlayerGames = (
  {
    page = 0,
    pageSize = 20,
    sessionId,
    provider,
  }: {
    page: number,
    pageSize: number,
    sessionId: string,
    provider: string,
  },
  http: HTTPClient = defaultHttp
) =>
  http.get(
    URL.GAMES,
    {
      page,
      pageSize,
      providerSlug: provider,
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
  return http.get(`${URL.GAMES}/count`);
};

export const getGameProviders = async (http: HTTPClient = defaultHttp) => {
  const providers = await http.get(URL.GAME_PROVIDERS);
  return { [`${ENTITY_KEYS.GAME_PROVIDER}s`]: providers };
};

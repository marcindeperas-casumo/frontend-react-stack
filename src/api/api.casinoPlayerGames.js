// @flow
import defaultHttp from "Services/http";
import { commaSeparated } from "Utils";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: `/casino-player/casino-games/api/v1/games`,
  GAMES_COUNT: `/casino-player/casino-games/api/v1/games/count`,
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getXTokenHeaders = (token: string) =>
  token ? { headers: { "X-Token": token } } : {};

export const getCasinoPlayerGames = async (
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
  await http.get(
    URL.GAMES,
    {
      page,
      pageSize,
      providerSlugs: commaSeparated(providers),
    },
    getXTokenHeaders(sessionId)
  );

export const getCasinoPlayerGamesCount = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => await http.get(URL.GAMES_COUNT, {}, getXTokenHeaders(sessionId));

export const getGameProviders = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => await http.get(URL.GAME_PROVIDERS, {}, getXTokenHeaders(sessionId));

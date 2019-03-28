// @flow
import { commaSeparated, isNilOrEmpty } from "Utils";
import defaultHttp from "Lib/http";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAMES_COUNT: "/casino-player/casino-games/api/v1/games/count",
  GAME_SEARCH: "/casino-player/casino-games/api/v1/games/search",
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getXTokenHeaders = (token: string) =>
  token ? { headers: { "X-Token": token } } : {};

const getGamesCountParams = (providers?: Array<string>) =>
  !isNilOrEmpty(providers) ? { providerSlugs: commaSeparated(providers) } : {};

export const getCasinoPlayerGames = async (
  {
    page,
    pageSize,
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

export const getCasinoPlayerGameSearch = async (
  {
    page,
    pageSize,
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

export const getCasinoPlayerGamesCount = async (
  { sessionId, providers }: { sessionId: string, providers?: Array<string> },
  http: HTTPClient = defaultHttp
) =>
  await http.get(
    URL.GAMES_COUNT,
    getGamesCountParams(providers),
    getXTokenHeaders(sessionId)
  );

export const getGameProviders = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => await http.get(URL.GAME_PROVIDERS, {}, getXTokenHeaders(sessionId));

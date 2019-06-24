// @flow
import { commaSeparated, isNilOrEmpty } from "Utils";
import clientHttp from "Lib/http";
import { getDeveloperOptions } from "Utils/developerOptions";

type HTTPClient = typeof clientHttp;

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAMES_COUNT: "/casino-player/casino-games/api/v1/games/count",
  GAME_SEARCH: "/casino-player/casino-games/api/v1/games/search",
  GAME_SEARCH_COUNT: "/casino-player/casino-games/api/v1/games/search/count",
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getHeaders = (token: string) => {
  if (!token) {
    return {};
  }
  const { showDisabledGames } = getDeveloperOptions();

  return {
    headers: {
      "X-Token": token,
      "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
    },
  };
};

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
  http: HTTPClient = clientHttp
) =>
  await http.get(
    URL.GAMES,
    {
      page,
      pageSize,
      providerSlugs: commaSeparated(providers),
    },
    getHeaders(sessionId)
  );

export const getCasinoPlayerGamesCount = async (
  { sessionId, providers }: { sessionId: string, providers?: Array<string> },
  http: HTTPClient = clientHttp
) =>
  await http.get(
    URL.GAMES_COUNT,
    getGamesCountParams(providers),
    getHeaders(sessionId)
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
  http: HTTPClient = clientHttp
) => {
  return await http.get(
    `${URL.GAME_SEARCH}`,
    {
      query,
      page,
      pageSize,
    },
    getHeaders(sessionId)
  );
};

export const getCasinoPlayerGameSearchCount = async (
  {
    sessionId,
    query,
  }: {
    sessionId: string,
    query: string,
  },
  http: HTTPClient = clientHttp
) => {
  return await http.get(
    `${URL.GAME_SEARCH_COUNT}`,
    { query },
    getHeaders(sessionId)
  );
};

export const getGameProviders = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = clientHttp
) => await http.get(URL.GAME_PROVIDERS, {}, getHeaders(sessionId));

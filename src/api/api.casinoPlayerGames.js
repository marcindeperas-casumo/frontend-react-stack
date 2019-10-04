// @flow
import { commaSeparated, isNilOrEmpty } from "Utils";
import clientHttp, { buildQueryParams } from "Lib/http";
import { getDeveloperOptions } from "Utils/developerOptions";

type HTTPClient = typeof clientHttp;

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAMES_COUNT: "/casino-player/casino-games/api/v1/games/count",
  GAMES_BATCH: "/casino-player/casino-games/api/v1/games/batch",
  GAME_SEARCH: "/casino-player/casino-games/api/v1/games/search",
  GAME_SEARCH_COUNT: "/casino-player/casino-games/api/v1/games/search/count",
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
  GAME_LISTS: "/casino-player/casino-games/api/v1/gamelists",
  MY_LIST: "/casino-player/casino-games/api/v1/gamelists/myList",
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
      "content-type": "application/json",
    },
  };
};

const getGamesCountParams = (providers?: Array<string>) =>
  !isNilOrEmpty(providers) ? { providerSlugs: commaSeparated(providers) } : {};

const buildGamesBatchIds = ids =>
  buildQueryParams(ids, { arrayFormat: "repeat" });

export const getCasinoPlayerGameList = async (
  { sessionId, gameListName }: { sessionId: string, gameListName: string },
  http: HTTPClient = clientHttp
) =>
  await http.get(
    `${URL.GAME_LISTS}/${gameListName}`,
    null,
    getHeaders(sessionId)
  );

export const addGameToMyList = async (
  {
    sessionId,
    gameSlug,
  }: {
    sessionId: string,
    gameSlug: string,
  },
  http: HTTPClient = clientHttp
) => await http.post(URL.MY_LIST, { gameSlug }, getHeaders(sessionId));

export const removeGameFromMyList = async (
  {
    sessionId,
    gameSlug,
  }: {
    sessionId: string,
    gameSlug: string,
  },
  http: HTTPClient = clientHttp
) => await http.del(`${URL.MY_LIST}/${gameSlug}`, getHeaders(sessionId));

export const getCasinoPlayerGamesBatch = async (
  {
    sessionId,
    ids,
  }: {
    sessionId: string,
    ids: Array<string>,
  },
  http: HTTPClient = clientHttp
) => {
  const query = buildGamesBatchIds({ ids });
  return await http.post(
    `${URL.GAMES_BATCH}?${query}`,
    null,
    getHeaders(sessionId)
  );
};

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

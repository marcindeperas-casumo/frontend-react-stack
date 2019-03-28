// @flow
import { join } from "ramda";
import defaultHttp from "Lib/http";

type HTTPClient = typeof defaultHttp;

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAMES_COUNT: "/casino-player/casino-games/api/v1/games/count",
  GAME_SEARCH: "/casino-player/casino-games/api/v1/games/search",
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

const getHeaders = (token: string) => {
  if (!token) {
    return {};
  }
  const showDisabledGames = localStorage.getItem("showDisabledGames");
  const isFeatureHiddenGames =
    showDisabledGames === "true" ? "HIDDEN_GAMES" : null;

  return {
    headers: {
      "X-Token": token,
      "X-Request-Features": isFeatureHiddenGames,
    },
  };
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
  http: HTTPClient = defaultHttp
) =>
  await http.get(
    URL.GAMES,
    {
      page,
      pageSize,
      providerSlugs: join(",")(providers),
    },
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
  http: HTTPClient = defaultHttp
) => {
  return await http.get(
    `${URL.GAME_SEARCH}/${query}`,
    {
      page,
      pageSize,
    },
    getHeaders(sessionId)
  );
};

export const getCasinoPlayerGamesCount = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => await http.get(URL.GAMES_COUNT, {}, getHeaders(sessionId));

export const getGameProviders = async (
  { sessionId }: { sessionId: string },
  http: HTTPClient = defaultHttp
) => await http.get(URL.GAME_PROVIDERS, {}, getHeaders(sessionId));

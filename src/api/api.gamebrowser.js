// @flow
import defaultHttp from "Services/http";

export const URL = {
  HANDSHAKE: "/api/gamebrowser/handshake",
  GAME_LISTS: "/api/gamebrowser/games-lists",
  GAME_SEARCH: "/api/gamebrowser/games-search",
  GAMES_LATEST_PLAYED: "/api/gamebrowser/latestPlayedGames/player",
  GAMES_BY_PROVIDER: "/api/gamebrowser/games-by-provider-game-names",
  GAMES_BY_SLUGS: "/api/gamebrowser/games-by-slugs",
  LIVE_CASINO: "/api/gamebrowser/liveCasino/tablesById",
};

type HTTPClient = typeof defaultHttp;

export const getGameBrowserHandshake = (
  { platform, country }: { platform: string, country: string },
  http: HTTPClient = defaultHttp
) => http.get(`${URL.HANDSHAKE}/${platform}/${country}`);

export const getGameLists = (
  {
    platform,
    country,
    id,
    ...data
  }: {
    platform: string,
    country: string,
    id: string,
    variant: string,
    page?: number,
    pageSize?: number,
  },
  http: HTTPClient = defaultHttp
) => http.get(`${URL.GAME_LISTS}/${platform}/${country}/${id}`, data);

export const getQuerySearch = (
  {
    platform,
    country,
    id,
    variant,
    page = 0,
    pageSize,
    query,
  }: {
    platform: string,
    country: string,
    id: string,
    variant: string,
    page: number,
    pageSize: number,
    query: string,
  },
  http: HTTPClient = defaultHttp
) =>
  http.get(`${URL.GAME_SEARCH}/${platform}/${country}`, {
    variant,
    page,
    pageSize,
    q: query,
  });

export const getLatestPlayedGames = (
  { playerId, pageSize = 20 }: { playerId: string, pageSize?: number },
  http: HTTPClient = defaultHttp
) =>
  http.get(`${URL.GAMES_LATEST_PLAYED}/${playerId}?numberOfGames=${pageSize}`);

export const getGamesByProviderGameNames = (
  {
    platform,
    country,
    variant,
    providerGameNames,
  }: {
    platform: "mobile" | string,
    country: string,
    variant: "default" | string,
    providerGameNames: string,
  },
  http: HTTPClient = defaultHttp
) =>
  http.get(`${URL.GAMES_BY_PROVIDER}/${platform}/${country}`, {
    variant,
    providerGameNames,
  });

export const getGamesBySlugs = (
  {
    platform,
    country,
    variant,
    slugs,
  }: {
    platform: "mobile" | string,
    country: string,
    variant: "default" | string,
    slugs: string,
  },
  http: HTTPClient = defaultHttp
) =>
  http.get(`${URL.GAMES_BY_SLUGS}/${platform}/${country}`, {
    variant,
    slugs,
  });

export const getLiveCasinoTable = (
  { ids, currency }: { ids: Array<string>, currency: string },
  http: HTTPClient = defaultHttp
) =>
  http.get(`${URL.LIVE_CASINO}`, {
    // Even if it is an array we need to use "id"
    // as a key here, as this is how it should be transformed in the URL in the end:
    // ?id[]=123&id[]=456&id[]=789
    id: ids,
    currency,
  });

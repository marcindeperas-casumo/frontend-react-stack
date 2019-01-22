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

export const getGameBrowserHandshake = (
  { platform, country },
  http = defaultHttp
) => {
  return http.get(`${URL.HANDSHAKE}/${platform}/${country}`);
};

export const getGameLists = (
  { platform, country, id, variant, page = 0, pageSize = 5 },
  http = defaultHttp
) =>
  http.get(`${URL.GAME_LISTS}/${platform}/${country}/${id}`, {
    variant,
    page,
    pageSize,
  });

export const getQuerySearch = (
  { platform, country, id, variant, page = 0, pageSize = 5, q },
  http = defaultHttp
) =>
  http.get(`${URL.GAME_SEARCH}/${platform}/${country}`, {
    variant,
    page,
    pageSize,
    q,
  });

export const getLatestPlayedGames = (
  { playerId, pageSize = 20 },
  http = defaultHttp
) =>
  http.get(`${URL.GAMES_LATEST_PLAYED}/${playerId}?numberOfGames=${pageSize}`);

export const getGamesByProviderGameNames = (
  { platform, country, variant, providerGameNames },
  http = defaultHttp
) =>
  http.get(`${URL.GAMES_BY_PROVIDER}/${platform}/${country}`, {
    variant,
    providerGameNames,
  });

export const getGamesBySlugs = (
  { platform, country, variant, slugs },
  http = defaultHttp
) =>
  http.get(`${URL.GAMES_BY_SLUGS}/${platform}/${country}`, {
    variant,
    slugs,
  });

export const getLiveCasinoTable = ({ ids, currency }, http = defaultHttp) =>
  http.get(`${URL.LIVE_CASINO}`, {
    // Even if it is an array we need to use "id"
    // as a key here, as this is how it should be transformed in the URL in the end:
    // ?id[]=123&id[]=456&id[]=789
    id: ids,
    currency,
  });

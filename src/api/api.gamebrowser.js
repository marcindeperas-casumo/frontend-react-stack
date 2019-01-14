import defaultHttp from "Lib/http";
import { getQueryParams } from "Utils";

export const URL = {
  HANDSHAKE: "/api/gamebrowser/handshake",
  GAME_LISTS: "/api/gamebrowser/games-lists",
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
) => {
  const queryParams = getQueryParams({
    variant,
    page,
    pageSize,
  });

  return http.get(
    `${URL.GAME_LISTS}/${platform}/${country}/${id}${queryParams}`
  );
};

export const getLatestPlayedGames = (
  { playerId, pageSize = 20 },
  http = defaultHttp
) =>
  http.get(`${URL.GAMES_LATEST_PLAYED}/${playerId}?numberOfGames=${pageSize}`);

export const getGamesByProviderGameNames = (
  { platform, country, variant, providerGameNames },
  http = defaultHttp
) => {
  const queryParams = getQueryParams({
    variant,
    providerGameNames,
  });

  return http.get(
    `${URL.GAMES_BY_PROVIDER}/${platform}/${country}${queryParams}`
  );
};

export const getGamesBySlugs = (
  { platform, country, variant, slugs },
  http = defaultHttp
) => {
  const queryParams = getQueryParams({
    variant,
    slugs,
  });

  return http.get(`${URL.GAMES_BY_SLUGS}/${platform}/${country}${queryParams}`);
};

export const getLiveCasinoTable = ({ ids, currency }, http = defaultHttp) => {
  const queryParams = getQueryParams({
    // Even if it is an array we need to use "id"
    // as a key here, as this is how it will be transformed:
    // ?id[]=123&id[]=456&id[]=789
    id: ids,
    currency,
  });

  return http.get(`${URL.LIVE_CASINO}${queryParams}`);
};

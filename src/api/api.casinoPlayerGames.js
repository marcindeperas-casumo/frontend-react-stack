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
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gamestudios",
  GAME_LISTS: "/casino-player/casino-games/api/v1/gamelists",
  MY_LIST: "/casino-player/casino-games/api/v1/gamelists/myList",
  GAME_SLUG_TO_ID: "/casino-player/casino-games/api/v2/mapping/slug",
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
      "Content-Type": "application/json",
    },
  };
};

const getGamesCountParams = (providers?: Array<string>) =>
  !isNilOrEmpty(providers) ? { studioSlugs: commaSeparated(providers) } : {};

const buildGamesBatchIds = ids =>
  buildQueryParams(ids, { arrayFormat: "repeat" });

export const getCasinoPlayerGameList = (
  { sessionId, gameListName }: { sessionId: string, gameListName: string },
  http: HTTPClient = clientHttp
) => http.get(`${URL.GAME_LISTS}/${gameListName}`, null, getHeaders(sessionId));

export const addGameToMyList = (
  {
    sessionId,
    gameSlug,
  }: {
    sessionId: string,
    gameSlug: string,
  },
  http: HTTPClient = clientHttp
) => http.post(URL.MY_LIST, { gameSlug }, getHeaders(sessionId));

export const removeGameFromMyList = (
  {
    sessionId,
    gameSlug,
  }: {
    sessionId: string,
    gameSlug: string,
  },
  http: HTTPClient = clientHttp
) => http.del(`${URL.MY_LIST}/${gameSlug}`, getHeaders(sessionId));

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
      studioSlugs: commaSeparated(providers),
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

export const gameSlugToId = (
  slug: string
): Promise<{
  id: string,
  name: string,
}> => clientHttp.get(`${URL.GAME_SLUG_TO_ID}/${slug}`);

export type GameCategory =
  | "BINGO"
  | "INSTANT_WIN"
  | "LIVE_CASINO"
  | "LOTTERY"
  | "SLOT_MACHINE"
  | "TABLE_GAME"
  | "VIDEO_POKER"
  | "SPORTS_BETTING"
  | "OTHER";
type GameMarket =
  | "SWEDEN"
  | "NORWAY"
  | "FINLAND"
  | "GERMANY"
  | "UNITED_KINGDOM"
  | "CANADA"
  | "NEW_ZEALAND"
  | "DENMARK"
  | "INDIA"
  | "SPAIN"
  | "JAPAN"
  | "REST_OF_WORLD";
type GameBig = {
  aspectRatioHeight: string,
  aspectRatioWidth: string,
  backgroundImage: string,
  category: GameCategory,
  description: string,
  gameStudio: string,
  hasPlayForFun: boolean,
  id: string,
  inMaintenance: boolean,
  jackpotIds: Array<string>,
  liveCasinoId: string,
  logo: string,
  markets: Array<GameMarket>,
  media: Array<{
    order: number,
    path: string,
    type: string,
  }>,
  metaDescription: string,
  metaTitle: string,
  playBackground: string,
  providerId: string,
  rtp: string,
  slug: string,
  title: string,
};
export const gameById = (gameId: string): Promise<GameBig> =>
  clientHttp.get(`${URL.GAMES}/${gameId}`);

export async function getGameCategory(slug: string): Promise<?GameCategory> {
  if (!slug) {
    return;
  }
  const { id } = await gameSlugToId(slug);
  const { category } = await gameById(id);

  return category;
}

// @flow
import { isMobile } from "@casumo/is-mobile";
import clientHttp from "Lib/http";
import { DEVICES } from "Src/constants";

const platform = isMobile(window) ? DEVICES.MOBILE : DEVICES.DESKTOP;
const DEFAULT_HEADERS = {
  headers: {
    "X-Request-Device": platform,
  },
};

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAME_SLUG_TO_ID: "/casino-player/casino-games/api/v2/mapping/slug",
};

export const gameSlugToId = (
  slug: string
): Promise<{
  id: string,
  name: string,
}> => clientHttp.get(`${URL.GAME_SLUG_TO_ID}/${slug}`, {}, DEFAULT_HEADERS);

export const gameById = (gameId: string): Promise<{ category: ?string }> =>
  clientHttp.get(`${URL.GAMES}/${gameId}`, {}, DEFAULT_HEADERS);

export async function getGameCategory(slug: string): Promise<?string> {
  if (!slug) {
    return;
  }
  const { id } = await gameSlugToId(slug);
  const { category } = await gameById(id);

  return category;
}

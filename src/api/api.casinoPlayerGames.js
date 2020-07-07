// @flow
import clientHttp from "Lib/http";
import { getDeveloperOptions } from "Utils/developerOptions";

export const URL = {
  GAMES: "/casino-player/casino-games/api/v1/games",
  GAME_SLUG_TO_ID: "/casino-player/casino-games/api/v2/mapping/slug",
};

const { showDisabledGames } = getDeveloperOptions();

export const gameSlugToId = (
  slug: string
): Promise<{
  id: string,
  name: string,
}> => clientHttp.get(`${URL.GAME_SLUG_TO_ID}/${slug}`);

export const gameById = (gameId: string): Promise<{ category: ?string }> => {
  return clientHttp.get(
    `${URL.GAMES}/${gameId}`,
    {},
    {
      headers: {
        "content-type": "application/json",
        "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
      },
    }
  );
};

export async function getGameCategory(slug: string): Promise<?string> {
  if (!slug) {
    return;
  }
  const { id } = await gameSlugToId(slug);
  const { category } = await gameById(id);

  return category;
}

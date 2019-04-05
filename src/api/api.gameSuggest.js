// @flow
import defaultHttp from "Lib/http";

type HTTPClient = typeof defaultHttp;

export const URLS = {
  GAME_SUGGEST: "/api/game-suggest/",
};

export const getSuggestedGames = async (
  { gameSlug }: { gameSlug: string },
  http: HTTPClient = defaultHttp
) => http.get(`${URLS.GAME_SUGGEST}${gameSlug}`);

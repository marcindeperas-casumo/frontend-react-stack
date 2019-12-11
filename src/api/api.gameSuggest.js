// @flow
import clientHttp from "Lib/http";

type HTTPClient = typeof clientHttp;

export const URLS = {
  GAME_SUGGEST: "/api/game-suggest/",
};

export const getSuggestedGames = (
  { gameSlug }: { gameSlug: string },
  http: HTTPClient = clientHttp
) => http.get(`${URLS.GAME_SUGGEST}${gameSlug}`);

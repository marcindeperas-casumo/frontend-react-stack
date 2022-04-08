import clientHttp from "Lib/http";

const GAME_EXCLUDED_URL = `/casino-player/game-type-exclusions/api/exclusion`;

type HTTPClient = typeof clientHttp;

export const getGameExcludedForPlayer = (http: HTTPClient = clientHttp) =>
  http.get(GAME_EXCLUDED_URL);

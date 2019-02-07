import http from "Services/http";

export const getSuggestedGames = async ({
  gameSlug
}) =>
  http.get(`/api/game-suggest/${gameSlug}`);

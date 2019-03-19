// @flow
import http from "Lib/http";

export const getSuggestedGames = async ({ gameSlug }: { gameSlug: string }) =>
  http.get(`/api/game-suggest/${gameSlug}`);

import http from "Lib/http";
import type { TPlayerWarmUpDetailsResponse } from "Models/accountWarmUp";

const BASE_URL = "/casino-player/player-warmup/api/warmup";

export function getDetails({
  playerId,
}): Promise<TPlayerWarmUpDetailsResponse> {
  return http.get(`${BASE_URL}/${playerId}/details`);
}

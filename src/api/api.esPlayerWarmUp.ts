import http from "Lib/http";

const BASE_URL = "/casino-player/player-warmup/api/warmup";

export type PlayerWarmUpDetailsResponse = {
  playerId: string;
  inWarmupPhase: boolean;
  warmupTimeEnd: string;
  verified: boolean;
};

export function getDetails(
  playerId: string
): Promise<PlayerWarmUpDetailsResponse> {
  return http.get(`${BASE_URL}/${playerId}/details`);
}

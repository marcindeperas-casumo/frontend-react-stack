// @flow
import http from "Lib/http";

export type LoginSessionSummary = {
  bets: number,
  winnings: number,
};

const BASE = "/casino-player/game-rounds/api/session-summary/aggregated";

export function getLoginSessionSummary(): Promise<LoginSessionSummary> {
  return http.get(BASE, { except: "SPORTS_BETTING" });
}

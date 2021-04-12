import http from "Lib/http";

export type LoginSessionSummary = {
  bets: number;
  winnings: number;
};

export function getLoginSessionSummary(
  sessionId: string
): Promise<LoginSessionSummary> {
  return http.get(
    `/casino-player/game-rounds/api/session-summary/aggregated/${sessionId}`,
    { except: "SPORTS_BETTING" },
    { credentials: "omit" }
  );
}

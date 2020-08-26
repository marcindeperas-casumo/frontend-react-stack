// @flow
import http from "Lib/http";

export type LoginSessionSummary = {
  totalBets: number,
  totalWins: number,
};

const BASE = "/casino-player/es-vault-integration/api/session-summary";

export function getLoginSessionSummary(): Promise<LoginSessionSummary> {
  return http.get(BASE);
}

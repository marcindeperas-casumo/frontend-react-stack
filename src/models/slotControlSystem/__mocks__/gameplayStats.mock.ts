import type { GameSessionStatsType } from "Models/slotControlSystem";

const now = 1576065735032;

const mock: GameSessionStatsType = {
  currency: "EUR",
  consumedBalance: 8,
  remainingBalance: 32,
  initialLimit: 40,
  totalBets: 5,
  totalWins: 11,
  lastUpdateTime: now,
};

export default mock;

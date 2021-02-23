//@flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '".."' has no exported member 'type'.
import { type GameSessionStatsType } from "Models/slotControlSystem";

const now = 1576065735032;

export default ({
  currency: "EUR",
  consumedBalance: 8,
  remainingBalance: 32,
  initialLimit: 40,
  totalBets: 5,
  totalWins: 11,
  lastUpdateTime: now,
// @ts-expect-error ts-migrate(2693) FIXME: 'GameSessionStatsType' only refers to a type, but ... Remove this comment to see the full error message
} : GameSessionStatsType);
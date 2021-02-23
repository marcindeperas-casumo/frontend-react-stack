//@flow
import { DateTime } from "luxon";
// @ts-expect-error ts-migrate(2305) FIXME: Module '".."' has no exported member 'type'.
import { type ActiveSessionType } from "Models/slotControlSystem";

const initialLimit = 20;
const totalBets = 10;
const totalWins = 300;
const consumedBalance = totalBets - totalWins;
const remainingBalance = initialLimit - consumedBalance;

const now = DateTime.fromISO("2020-01-01T00:00:00");
const startedTime = now.minus({ minutes: 15 });
const expiringTime = now.plus({ minutes: 15 });
const durationInSecs = expiringTime.diff(startedTime, ["seconds"]).toFormat("s");
const reminderFrequencyInSecs = 360; // 5 minutes
const lastUpdateTime = now.minus({ seconds: reminderFrequencyInSecs });

export default ({
  id: "1",
  expiringTime: expiringTime.toMillis(),
  startedTime: startedTime.toMillis(),
  durationInSecs,
  reminderFrequencyInSecs,
  postSessionExclusionInMinutes: null,
  stats: {
    currency: "EUR",
    initialLimit,
    totalBets,
    totalWins,
    consumedBalance,
    remainingBalance,
    lastUpdateTime: lastUpdateTime.toMillis(),
  },
// @ts-expect-error ts-migrate(2693) FIXME: 'ActiveSessionType' only refers to a type, but is ... Remove this comment to see the full error message
} : ActiveSessionType);

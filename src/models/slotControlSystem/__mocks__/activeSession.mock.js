//@flow
import { type ActiveSessionType } from "Models/slotControlSystem";
import stats from "./gameplayStats.mock";

const now = 1576065735032;

export default ({
  id: "123-456-789",
  expiringTime: now + 1000 * 60,
  startedTime: now - 1000 * 60 * 5,
  durationInSecs: 300,
  reminderFrequencyInSecs: 10 * 60,
  postSessionExclusionInMinutes: null,
  limit: {
    amount: 111,
    currency: "GBP",
  },
  stats,
} : ActiveSessionType);
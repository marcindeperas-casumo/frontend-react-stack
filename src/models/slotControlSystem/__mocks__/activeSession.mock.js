//@flow
import { type ActiveSessionType } from "Models/slotControlSystem";

export default ({
  id: "123-456-789",
  expiringTime: Date.now() + 1000 * 60,
  startedTime: Date.now() - 1000 * 60 * 5,
  durationInSecs: 300,
  reminderFrequencyInSecs: 10 * 60,
  postSessionExclusionInMinutes: null,
  limit: {
    amount: 111,
    currency: "GBP",
  },
} : ActiveSessionType);
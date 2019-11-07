//@flow
import { type EndedSessionType } from "Models/slotControlSystem";

export default ({
  id: "123-456-789",
  startedTime: Date.now() - 1000 * 60 * 14,
  endedTime: Date.now() - 1000 * 60 * 7,
  endReason: "Session Timeout",
} : EndedSessionType);
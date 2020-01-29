//@flow
import { type EndedSessionType } from "Models/slotControlSystem";
import stats from "./gameplayStats.mock";

const now = 1576065735032;

export default ({
  id: "123-456-789",
  startedTime: now - 1000 * 60 * 14,
  endedTime: now - 1000 * 60 * 7,
  endReason: "Session Timeout",
  stats,
} : EndedSessionType);
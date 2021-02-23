//@flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '".."' has no exported member 'type'.
import { type EndedSessionType } from "Models/slotControlSystem";
import stats from "./gameplayStats.mock";

const now = 1576065735032;

export default ({
  id: "123-456-789",
  startedTime: now - 1000 * 60 * 14,
  endedTime: now - 1000 * 60 * 7,
  endReason: "LOGGED_OUT",
  stats,
// @ts-expect-error ts-migrate(2693) FIXME: 'EndedSessionType' only refers to a type, but is b... Remove this comment to see the full error message
} : EndedSessionType);
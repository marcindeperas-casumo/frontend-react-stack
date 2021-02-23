//@flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '".."' has no exported member 'type'.
import { type ExclusionType } from "Models/slotControlSystem";

const now = 1576065735032;

export default ({
  id: "123-456-789",
  expiringTime: now + 1000 * 60 * 9,
  startedTime: now - 1000,
// @ts-expect-error ts-migrate(2693) FIXME: 'ExclusionType' only refers to a type, but is bein... Remove this comment to see the full error message
} : ExclusionType);
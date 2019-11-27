//@flow
import { type ExclusionType } from "Models/slotControlSystem";

export default ({
  id: "123-456-789",
  expiringTime: Date.now() + 1000 * 60 * 9,
  startedTime: Date.now() - 1000,
} : ExclusionType);
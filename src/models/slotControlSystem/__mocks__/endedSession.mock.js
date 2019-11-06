//@flow
import { type EndedSessionType } from "Models/slotControlSystem";

export default ({
  id: "123-456-789",
  endTime: Date.now() - 1000 * 60 * 7,
} : EndedSessionType);
// @flow
import { DateTime } from "luxon";
import type { ActiveSessionType } from "Models/slotControlSystem";
import activeSessionMock from "Models/slotControlSystem/__mocks__/activeSession.mock";

export function useActiveGameSession(): ?ActiveSessionType {
  return activeSessionMock;
}

// @flow
import { type UseSessionsStateType } from "../slotControlSystem.types";
import activeSession from "./activeSession.mock";

export function useSessionsState(): UseSessionsStateType {
  return {
    activeSession,
    activeExclusion: null,
    lastEndedSession: null,
    lastEndedSessionDuringLastHour: false,
    isFetching: false,
    isSynced: true,
  };
}
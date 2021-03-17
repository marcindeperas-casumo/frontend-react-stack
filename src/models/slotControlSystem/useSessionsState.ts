import { useSelector } from "react-redux";
import {
  activeSessionSelector,
  endedSessionSelector,
  activeExclusionSelector,
  isFetchingActiveSessionSelector,
  lastUpdateTimeSelector,
} from "Models/slotControlSystem";
import type {
  ActiveSessionType,
  EndedSessionType,
  ExclusionType,
  UseSessionsStateType,
} from "Models/slotControlSystem";

export function useSessionsState(): UseSessionsStateType {
  const activeSession: ActiveSessionType = useSelector(activeSessionSelector);
  const lastEndedSession: EndedSessionType = useSelector(endedSessionSelector);
  const activeExclusion: ExclusionType = useSelector(activeExclusionSelector);
  const lastUpdateTime: number = useSelector(lastUpdateTimeSelector);
  const isFetching = useSelector(isFetchingActiveSessionSelector);
  const isSynced = lastUpdateTime > 0;
  const lastEndedSessionDuringLastHour = Boolean(
    lastEndedSession?.endedTime + 1000 * 60 * 60 > Date.now()
  );

  return {
    activeSession,
    lastEndedSession,
    lastEndedSessionDuringLastHour,
    activeExclusion,
    isFetching,
    isSynced,
  };
}

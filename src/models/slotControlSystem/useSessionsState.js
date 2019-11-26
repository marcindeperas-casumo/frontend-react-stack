// @flow
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initFetchActiveSessionAction,
  activeSessionSelector,
  endedSessionSelector,
  activeExclusionSelector,
  isFetchingActiveSessionSelector,
  type ActiveSessionType,
  type EndedSessionType,
  type ExclusionType,
  type UseSessionsStateType,
} from "Models/slotControlSystem";

export function useSessionsState(): UseSessionsStateType {
  const dispatch = useDispatch();
  const activeSession: ActiveSessionType = useSelector(activeSessionSelector);
  const lastEndedSession: EndedSessionType = useSelector(endedSessionSelector);
  const activeExclusion: ExclusionType = useSelector(activeExclusionSelector);
  const isFetching = useSelector(isFetchingActiveSessionSelector);
  const isOlderThan15s = activeSession
    ? activeSession.lastUpdateTime + 1000 * 15 < Date.now()
    : true;
  const lastEndedSessionDuringLastHour = Boolean(
    lastEndedSession && lastEndedSession.endedTime + 1000 * 60 * 60 > Date.now()
  );

  useEffect(() => {
    if (isOlderThan15s) {
      dispatch(initFetchActiveSessionAction());
    }
  }, [dispatch, isOlderThan15s]);

  return {
    activeSession: isOlderThan15s ? null : activeSession,
    lastEndedSession,
    lastEndedSessionDuringLastHour,
    activeExclusion,
    isFetching,
  };
}

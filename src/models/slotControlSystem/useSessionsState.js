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
  // data is older than 15s
  const isOld = activeSession
    ? activeSession.lastUpdateTime + 1000 * 15 < Date.now()
    : true;
  const lastEndedSessionDuringLastHour = Boolean(
    lastEndedSession && lastEndedSession.endedTime + 1000 * 60 * 60 > Date.now()
  );

  useEffect(() => {
    if (isOld) {
      dispatch(initFetchActiveSessionAction());
    }
  }, [dispatch, isOld]);

  return {
    activeSession: isOld ? null : activeSession,
    lastEndedSession,
    lastEndedSessionDuringLastHour,
    activeExclusion,
    isFetching,
  };
}

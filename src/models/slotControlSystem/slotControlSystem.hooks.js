// @flow
import * as React from "react";
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
} from "Models/slotControlSystem";

type UseActiveSessionType = {
  isFetching: boolean,
  activeSession: ?ActiveSessionType,
  endedSession: ?EndedSessionType,
  endedSessionDuringLastHour: boolean,
  activeExclusion: ?ExclusionType,
};

export function useSessionsState(): UseActiveSessionType {
  const dispatch = useDispatch();
  const activeSession = useSelector(activeSessionSelector);
  const endedSession = useSelector(endedSessionSelector);
  const activeExclusion = useSelector(activeExclusionSelector);
  const isFetching = useSelector(isFetchingActiveSessionSelector);
  // data is older than 1 minute
  const isOld = activeSession
    ? activeSession.lastUpdateTime + 1000 * 60 < Date.now()
    : true;
  const endedSessionDuringLastHour =
    endedSession && endedSession.endTime + 1000 * 60 * 60 > Date.now();

  React.useEffect(() => {
    if (isOld) {
      dispatch(initFetchActiveSessionAction());
    }
  }, [dispatch, isOld]);

  return {
    activeSession: isOld ? null : activeSession,
    endedSession,
    endedSessionDuringLastHour,
    activeExclusion,
    isFetching,
  };
}

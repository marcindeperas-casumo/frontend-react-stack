// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initFetchActiveSessionAction,
  activeSessionSelector,
  activeSessionUpdatedAtSelector,
  isFetchingActiveSessionSelector,
  type ActiveSessionType,
} from "Models/slotControlSystem";

type UseActiveSessionType = {
  isFetching: boolean,
  isOld: boolean,
  activeSession: ?ActiveSessionType,
};

export function useActiveSession(): UseActiveSessionType {
  const dispatch = useDispatch();
  const updatedAt = useSelector(activeSessionUpdatedAtSelector);
  const activeSession = useSelector(activeSessionSelector);
  const isFetching = useSelector(isFetchingActiveSessionSelector);
  // data is older than 1 minute
  const isOld = updatedAt + 1000 * 60 < Date.now();

  React.useEffect(() => {
    if (isOld) {
      dispatch(initFetchActiveSessionAction());
    }
  }, [dispatch, isOld]);

  return {
    activeSession,
    isFetching,
    isOld,
  };
}

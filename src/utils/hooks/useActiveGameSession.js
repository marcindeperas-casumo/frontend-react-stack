// @flow
import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  initFetchActiveSessionAction,
  activeSessionSelector,
  type ActiveSessionType,
} from "Models/slotControlSystem";

export function useActiveGameSession(): ?ActiveSessionType {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(initFetchActiveSessionAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return useSelector(activeSessionSelector, shallowEqual);
}

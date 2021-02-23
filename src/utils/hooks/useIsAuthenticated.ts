// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isAuthenticated } from "Models/handshake";

export function useIsAuthenticated() {
  return useSelector(isAuthenticated, shallowEqual);
}

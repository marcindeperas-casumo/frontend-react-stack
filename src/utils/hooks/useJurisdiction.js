// @flow
import { useSelector, shallowEqual } from "react-redux";
import { jurisdictionSelector } from "Models/handshake";

export function useJurisdiction() {
  return useSelector(jurisdictionSelector, shallowEqual);
}

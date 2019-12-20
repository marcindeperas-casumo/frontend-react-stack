// @flow
import { useSelector } from "react-redux";
import { jurisdictionSelector } from "Models/handshake";

export function useJurisdiction() {
  return useSelector(jurisdictionSelector);
}

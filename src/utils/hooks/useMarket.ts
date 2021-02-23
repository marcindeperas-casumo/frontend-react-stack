// @flow
import { useSelector, shallowEqual } from "react-redux";
import { marketSelector } from "Models/handshake";

export function useMarket() {
  return useSelector(marketSelector, shallowEqual);
}

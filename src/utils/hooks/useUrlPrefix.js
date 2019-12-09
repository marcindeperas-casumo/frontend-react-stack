// @flow
import { useSelector, shallowEqual } from "react-redux";
import { URL_PREFIXES } from "Src/constants";
import { marketSelector } from "Models/handshake";

export function useUrlPrefix() {
  return useSelector(state => {
    const market = marketSelector(state);
    return URL_PREFIXES[market];
  }, shallowEqual);
}

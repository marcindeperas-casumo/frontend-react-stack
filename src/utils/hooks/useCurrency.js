// @flow
import { useSelector, shallowEqual } from "react-redux";
import { currencySelector } from "Models/handshake";

export function useCurrency() {
  return useSelector(currencySelector, shallowEqual);
}

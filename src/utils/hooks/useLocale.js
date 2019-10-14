// @flow
import { useSelector, shallowEqual } from "react-redux";
import { INTL_LOCALES } from "Src/constants";
import { marketSelector } from "Models/handshake";

export function useLocale() {
  return useSelector(state => {
    const market = marketSelector(state);
    return INTL_LOCALES[market];
  }, shallowEqual);
}

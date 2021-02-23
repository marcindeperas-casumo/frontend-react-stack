// @flow
import { useSelector, shallowEqual } from "react-redux";
import { INTL_LOCALES } from "Src/constants";
import { marketSelector } from "Models/handshake";

export function useLocale() {
  return useSelector(state => {
    const market = marketSelector(state);
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
    return INTL_LOCALES[market];
  }, shallowEqual);
}

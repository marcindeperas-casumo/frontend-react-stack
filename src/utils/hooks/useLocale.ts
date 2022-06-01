import { useSelector, shallowEqual } from "react-redux";
import { INTL_LOCALES, TMarket } from "Src/constants";
import { marketSelector } from "Models/handshake";

export function useLocale() {
  return useSelector(state => {
    const market = marketSelector(state) as TMarket;
    return INTL_LOCALES[market];
  }, shallowEqual);
}

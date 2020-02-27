// @flow
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { URL_PREFIXES } from "Src/constants";
import { marketSelector } from "Models/handshake";

const isTLDMarketSpecific: string => boolean = R.pipe(
  R.anyPass([
    R.equals("com"),
    R.equals("dev"),
    R.equals("local"),
    R.equals("localhost"),
  ]),
  R.not
);

export function useUrlPrefix(): string | null {
  return useSelector(state => {
    const tld = window.location.hostname.split(".").pop(); // eslint-disable-line fp/no-mutating-methods
    if (isTLDMarketSpecific(tld)) {
      return null;
    }

    const market = marketSelector(state);
    return URL_PREFIXES[market];
  }, shallowEqual);
}

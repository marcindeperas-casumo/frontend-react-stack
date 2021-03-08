import { useSelector, shallowEqual } from "react-redux";
import { URL_PREFIXES } from "Src/constants";
import { marketSelector } from "Models/handshake";
import { isTLDMarketSpecific } from "Utils";

export function useUrlPrefix(): string | null {
  return useSelector(state => {
    const tld = window.location.hostname.split(".").pop(); // eslint-disable-line fp/no-mutating-methods
    if (isTLDMarketSpecific(tld)) {
      return null;
    }

    const market = marketSelector(state);
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
    return URL_PREFIXES[market];
  }, shallowEqual);
}

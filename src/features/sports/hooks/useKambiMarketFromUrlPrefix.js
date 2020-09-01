// @flow
import { useSelector } from "react-redux";
import { pickBy, keys, head } from "ramda";
import { URL_PREFIXES, DEFAULT_MARKET } from "Src/constants";
import { DEFAULT_KAMBI_MARKET } from "Features/sports/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";

/**
 * `useKambiMarketFromUrlPrefix` not to be confused with hooks/useUrlPrefix.js
 * which returns a urlPrefix based on market taken from LiS handshake.
 * This one instead takes a urlPrefix as argument, and resolves market, kambiMarket
 * and locale from it, since we do not have this info in LoS handshake.
 */
export function useKambiMarketFromUrlPrefix(
  urlPrefix: string
): {
  market: string,
  kambiMarket: string,
  locale: string,
} {
  const market =
    head(keys(pickBy(v => v === urlPrefix, URL_PREFIXES))) || DEFAULT_MARKET;
  const kambiMarket =
    head(market.split("_")).toUpperCase() || DEFAULT_KAMBI_MARKET;
  const supportedLang = getKambiSupportedLanguage(
    useLocale().replace("-", "_")
  );
  const currency = useSelector(currencySelector);

  return {
    market,
    kambiMarket,
    locale: supportedLang,
    currency,
  };
}

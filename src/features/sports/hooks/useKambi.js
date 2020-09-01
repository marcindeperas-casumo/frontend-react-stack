// @flow
import { useSelector } from "react-redux";
import { pickBy, keys, head } from "ramda";
import { URL_PREFIXES, DEFAULT_MARKET, CURRENCIES } from "Src/constants";
import { DEFAULT_KAMBI_MARKET } from "Features/sports/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLocale, useUrlPrefix } from "Utils/hooks";
import { currencySelector } from "Models/handshake";

/**
 * `useKambi` not to be confused with hooks/useUrlPrefix.js
 * which returns a urlPrefix based on market taken from LiS handshake.
 * This one instead takes a urlPrefix as argument, and resolves market, kambiMarket
 * and locale from it, since we do not have this info in LoS handshake.
 */
export function useKambi(): {
  market: string,
  kambiMarket: string,
  locale: string,
  currency: string,
} {
  const urlPrefix = useUrlPrefix();
  const market =
    head(keys(pickBy(v => v === urlPrefix, URL_PREFIXES))) || DEFAULT_MARKET;
  const kambiMarket =
    head(market.split("_")).toUpperCase() || DEFAULT_KAMBI_MARKET;
  const locale = useLocale();
  const supportedLang = getKambiSupportedLanguage(locale.replace("-", "_"));
  const currency = useSelector(currencySelector);

  return {
    market,
    kambiMarket,
    locale: supportedLang,
    currency: currency || CURRENCIES.EUR,
  };
}

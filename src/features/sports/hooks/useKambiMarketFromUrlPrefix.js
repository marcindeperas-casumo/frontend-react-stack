// @flow
import { pickBy, keys, head } from "ramda";
import {
  URL_PREFIXES,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_MARKET,
} from "Src/constants";
import { DEFAULT_KAMBI_MARKET } from "Features/sports/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";

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
  const language = LANGUAGES[market] || DEFAULT_LANGUAGE;
  const kambiMarket =
    head(market.split("_")).toUpperCase() || DEFAULT_KAMBI_MARKET;
  const locale = getKambiSupportedLanguage(`${language}_${kambiMarket}`);

  return {
    market,
    kambiMarket,
    locale,
  };
}

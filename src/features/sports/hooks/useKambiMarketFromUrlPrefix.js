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

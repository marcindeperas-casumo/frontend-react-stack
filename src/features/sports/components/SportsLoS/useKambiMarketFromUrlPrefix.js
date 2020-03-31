// @flow
import { pickBy, keys, head } from "ramda";
import { URL_PREFIXES, LANGUAGES, MARKETS } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { getKambiSupportedLanguage } from "Features/sports/kambi";

const DEFAULT_KAMBI_MARKET = "GB";

export const useKambiMarketFromUrlPrefix = (urlPrefix: string) => {
  const market =
    head(keys(pickBy(v => v === urlPrefix, URL_PREFIXES))) || MARKETS.___en;
  const language = LANGUAGES[market] || DEFAULT_LANGUAGE;
  const kambiMarket =
    head(market.split("_")).toUpperCase() || DEFAULT_KAMBI_MARKET;
  const locale = getKambiSupportedLanguage(`${language}_${kambiMarket}`);

  return {
    market,
    kambiMarket,
    locale,
  };
};

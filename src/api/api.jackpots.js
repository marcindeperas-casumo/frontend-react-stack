// @flow
import clientHttp from "Lib/http";
import {
  transformRawJackpotObject,
  type TransformedJackpot,
} from "Models/jackpots";

type HTTPClient = typeof clientHttp;

type getJackpotsArgs = {
  market: string,
  currencyCode: string,
};

export const URLS = {
  JACKPOTS: "/api/common/query/jackpots",
};

export const getJackpots = async (
  { market = "___en", currencyCode = "EUR" }: getJackpotsArgs,
  http: HTTPClient = clientHttp
) => {
  const url = `${URLS.JACKPOTS}/${market}/currency/${currencyCode}`;
  const { jackpots = [] } = (await http.get(url)) || {};
  const transformedJackpots: Array<TransformedJackpot> = jackpots.map(
    transformRawJackpotObject
  );

  return { jackpots: transformedJackpots };
};

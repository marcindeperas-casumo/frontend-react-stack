// @flow
import http from "Lib/http";
import {
  transformRawJackpotObject,
  type TransformedJackpot,
} from "Models/jackpots";

type getJackpotsArgs = {
  market: string,
  currencyCode: string,
};

export const getJackpots = async ({
  market = "___en",
  currencyCode = "EUR",
}: getJackpotsArgs) => {
  const apiBaseUrl = "/api/common/query/jackpots";
  const url = `${apiBaseUrl}/${market}/currency/${currencyCode}`;
  const { jackpots = [] } = (await http.get(url)) || {};
  const transformedJackpots: Array<TransformedJackpot> = jackpots.map(
    transformRawJackpotObject
  );

  return { jackpots: transformedJackpots };
};

import http from "Lib/http";
import { transformRawJackpotObject } from "Models/jackpots";

export const getJackpots = async ({
  market = "___en",
  currencyCode = "EUR",
}) => {
  const apiBaseUrl = "/api/common/query/jackpots";
  const url = `${apiBaseUrl}/${market}/currency/${currencyCode}`;
  const { jackpots = [] } = (await http.get(url)) || {};
  const transformedJackpots = jackpots.map(transformRawJackpotObject);

  return { jackpots: transformedJackpots };
};

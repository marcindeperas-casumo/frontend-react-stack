// @flow
import httpClient from "Lib/http";

type HTTPClient = typeof httpClient;

export const URLS = {
  MUSTDROP_JACKPOTS:
    "/casino-player/jackpots-service/api/redtiger/jackpots/casumo",
};

export const getJackpotsMustDrop = async (
  {
    currency = "EUR",
  }: {
    currency: string,
  },
  http: HTTPClient = httpClient
) => {
  const url = `${URLS.MUSTDROP_JACKPOTS}?currency=${currency}`;
  return (await http.get(url)) || {};
};

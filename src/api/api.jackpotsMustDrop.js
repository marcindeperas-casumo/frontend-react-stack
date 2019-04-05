// @flow
import defaultHttp from "Lib/http";

type HTTPClient = typeof defaultHttp;

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
  http: HTTPClient = defaultHttp
) => {
  const url = `${URLS.MUSTDROP_JACKPOTS}?currency=${currency}`;
  return (await http.get(url)) || {};
};

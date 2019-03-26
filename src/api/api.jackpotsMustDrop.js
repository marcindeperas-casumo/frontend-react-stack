// @flow
import http from "Lib/http";

export const getJackpotsMustDrop = async ({
  currency = "EUR",
}: {
  currency: string,
}) => {
  const apiUrl = "/casino-player/jackpots-service/api/redtiger/jackpots/casumo";
  const url = `${apiUrl}?currency=${currency}`;
  return (await http.get(url)) || {};
};

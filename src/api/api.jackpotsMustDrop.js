import http from "Services/http";

export const getJackpotsMustDrop = async ({ currency = "EUR" }) => {
  const apiUrl = "/casino-player/jackpots-service/api/redtiger/jackpots/casumo";
  const url = `${apiUrl}?currency=${currency}`;
  const jackpotsMustDrop = (await http.get(url)) || {};

  return jackpotsMustDrop;
};

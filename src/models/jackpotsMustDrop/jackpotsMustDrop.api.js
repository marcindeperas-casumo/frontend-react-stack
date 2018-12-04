import { usingGET as httpGet } from "Utils/index";

export const getJackpotsMustDrop = async ({ currency = "EUR" }) => {
  const apiUrl = "jackpots/redtiger/jackpots/casumo";
  const url = `${apiUrl}?currency=${currency}`;
  const jackpotsMustDrop = (await httpGet(url)) || {};

  return jackpotsMustDrop;
};

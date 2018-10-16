import { usingGET as httpGet } from "Utils/index";
import { transformRawJackpotObject } from "./jackpots.utils";

// TODO: @leventebalogh Move this to the "clients" folder & rename the folder to "api"
export const getJackpots = async ({
  market = "___en",
  currencyCode = "EUR",
}) => {
  const apiUrl = "common/query/jackpots";
  const url = `${apiUrl}/${market}/currency/${currencyCode}`;
  const { jackpots = [] } = (await httpGet(url)) || {};
  const transformedJackpots = jackpots.map(transformRawJackpotObject);

  return { jackpots: transformedJackpots };
};

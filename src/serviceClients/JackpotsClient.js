import { usingGET } from "../utils";

const httpService = {
  get: usingGET,
};

export const JackpotsAPIUrl = "common/query/jackpots";

export const JackpotsClientFactory = ({ http }) => {
  const defaultMarket = "___en";
  const jackpots = (market = defaultMarket) =>
    http.get(`${JackpotsAPIUrl}/${market}`);

  return { jackpots };
};

export default JackpotsClientFactory({ http: httpService });

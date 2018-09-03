import { usingGET } from "../lib/utils";

const httpService = {
  get: usingGET,
};

export const JackpotsAPIUrl = "common/query/jackpots";

export const JackpotsClientFactory = ({ http }) => {
  const defaultMarket = "___en";
  const defaultCurrency = "EUR";
  const jackpots = ({
    market = defaultMarket,
    currencyCode = defaultCurrency,
  }) => http.get(`${JackpotsAPIUrl}/${market}/currency/${currencyCode}`);

  return { jackpots };
};

export default JackpotsClientFactory({ http: httpService });

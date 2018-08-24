import { usingGET } from "../utils";

const httpService = {
  get: usingGET,
};

export const JackpotsAPIUrl = "common/query/jackpots";

export const JackpotsClientFactory = ({ http }) => {
  const jackpots = () => http.get(JackpotsAPIUrl);

  return { jackpots };
};

export default JackpotsClientFactory({ http: httpService });

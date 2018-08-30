import { usingGET } from "../lib/utils";

const httpService = {
  get: usingGET,
};

export const CommonClientFactory = ({ http }) => {
  const handshake = () => http.get("common/handshake");

  return { handshake };
};

export default CommonClientFactory({ http: httpService });

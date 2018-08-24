import { usingGET } from "../lib/utils";

const httpService = {
  get: usingGET,
};

export const handshakeAPIUrl = "common/handshake";

export const CommonClientFactory = ({ http }) => {
  const handshake = () => http.get(handshakeAPIUrl);

  return { handshake };
};

export default CommonClientFactory({ http: httpService });

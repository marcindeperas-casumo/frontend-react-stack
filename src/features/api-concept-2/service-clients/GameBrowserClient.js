import { usingGET } from "../../../utils";
const httpService = {
  get: usingGET
};

export const GameBrowserClientFactory = ({ http }) => {
  return {
    handshake: ({ country }) =>
      http.get(`gamebrowser/handshake/mobile/${country}`),
    getById: ({ id }) => http.get(`/api/${id}`)
  };
};

export default GameBrowserClientFactory({ http: httpService });

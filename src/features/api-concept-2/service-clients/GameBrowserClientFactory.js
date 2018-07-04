import { usingGET } from "../../../utils";
const httpService = {
  get: usingGET
};

export const GameBrowserClientFactory = ({ httpService }) => {
  return {
    handshake: ({ country }) =>
      httpService.get(`gamebrowser/handshake/mobile/${country}`),
    getById: ({ id }) => httpService.get(`/api/${id}`)
  };
};

export default GameBrowserClientFactory({ httpService });

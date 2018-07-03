const httpService = {};

export const GameBrowserClientFactory = ({ httpService }) => {
  return {
    handshake: () => httpService.get("/api/handshake"),
    getById: ({ id }) => httpService.get(`/api/${id}`)
  };
};

export default GameBrowserClientFactory({ httpService });

import { stringify } from "qs";
import { usingGET } from "../utils";

const httpService = {
  get: usingGET,
};

export const GameBrowserClientFactory = ({ http }) => {
  return {
    handshake: ({ country, platform }) =>
      http.get(`gamebrowser/handshake/${platform}/${country}`),

    gamesLists: ({
      country,
      platform,
      id,
      hash,
      variant,
      page = 0,
      pageSize = 5,
    }) =>
      http.get(
        `gamebrowser/games-lists/${platform}/${country}/${id}?${stringify(
          { hash, variant, page, pageSize },
          { skipNulls: true }
        )}`
      ),

    latestPlayedGames: ({ playerId, pageSize = 5 }) =>
      http.get(
        `gamebrowser/latestPlayedGames/player/${playerId}?numberOfGames=${pageSize}`
      ),
  };
};

export default GameBrowserClientFactory({ http: httpService });

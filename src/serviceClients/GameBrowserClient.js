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
    gamesByProviderGameNames: ({
      platform,
      country,
      providerGameNames,
      variant,
      hash,
    }) =>
      http.get(
        `gamebrowser/games-by-provider-game-names/${platform}/${country}?${stringify(
          { hash, variant, providerGameNames },
          { arrayFormat: "brackets" }
        )}`
      ),
  };
};

export default GameBrowserClientFactory({ http: httpService });

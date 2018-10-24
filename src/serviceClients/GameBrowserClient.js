import { stringify } from "qs";
import { usingGET } from "Utils/index";

const httpService = {
  get: usingGET,
};

export const GameBrowserClientFactory = ({ http }) => {
  return {
    handshake: ({ country, platform }) =>
      http.get(`gamebrowser/handshake/${platform}/${country}`),

    gamesLists: ({ country, platform, id, variant, page = 0, pageSize = 5 }) =>
      http.get(
        `gamebrowser/games-lists/${platform}/${country}/${id}?${stringify(
          { variant, page, pageSize },
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
    }) =>
      http.get(
        `gamebrowser/games-by-provider-game-names/${platform}/${country}?${stringify(
          { variant, providerGameNames },
          { arrayFormat: "brackets" }
        )}`
      ),
    gamesBySlugs: ({ platform, country, slugs, variant }) =>
      http.get(
        `gamebrowser/games-by-slugs/${platform}/${country}?${stringify(
          { variant, slugs },
          { arrayFormat: "brackets" }
        )}`
      ),
    liveCasinoTablesById: ({ ids, currency }) =>
      http.get(
        `gamebrowser/liveCasino/tablesById?${stringify(
          { id: ids, currency },
          { arrayFormat: "brackets" }
        )}`
      ),
  };
};

export default GameBrowserClientFactory({ http: httpService });

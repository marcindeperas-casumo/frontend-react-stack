import { stringify } from "qs";
import { usingGET } from "Utils/index";

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
      variant,
      page = 0,
      pageSize = 5,
    }) => {
      try {
        return http.get(
          `gamebrowser/games-lists/${platform}/${country}/${id}?${stringify(
            { variant, page, pageSize },
            { skipNulls: true }
          )}`
        );
      } catch (e) {
        console.error("Games lists query is unavailable 🤷‍♀️", e);
        return [];
      }
    },
    latestPlayedGames: ({ playerId, pageSize = 5 }) => {
      try {
        return http.get(
          `gamebrowser/latestPlayedGames/player/${playerId}?numberOfGames=${pageSize}`
        );
      } catch (e) {
        console.error("Latest played games query is unavailable 🤷‍♀️", e);
        return [];
      }
    },
    gamesByProviderGameNames: ({
      platform,
      country,
      providerGameNames,
      variant,
    }) => {
      try {
        return http.get(
          `gamebrowser/games-by-provider-game-names/${platform}/${country}?${stringify(
            { variant, providerGameNames },
            { arrayFormat: "brackets" }
          )}`
        );
      } catch (e) {
        console.error("Games by provider name query is unavailable 🤷‍♀️", e);
        return [];
      }
    },
    gamesBySlugs: ({ platform, country, slugs, variant }) =>
      http.get(
        `gamebrowser/games-by-slugs/${platform}/${country}?${stringify(
          { variant, slugs },
          { arrayFormat: "brackets" }
        )}`
      ),
    liveCasinoTablesById: ({ ids, currency }) => {
      try {
        return http.get(
          `gamebrowser/liveCasino/tablesById?${stringify(
            { id: ids, currency },
            { arrayFormat: "brackets" }
          )}`
        );
      } catch (e) {
        console.error("Live casino tables query is unavailable 🤷‍♀️", e);
        return [];
      }
    },
  };
};

export default GameBrowserClientFactory({ http: httpService });

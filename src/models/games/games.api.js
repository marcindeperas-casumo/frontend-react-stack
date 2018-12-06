import { assoc, complement, compose, isNil, prop } from "ramda";

import GameBrowserClient from "Clients/GameBrowserClient";
import { getJackpots } from "Models/jackpots";

const playerLatestPlayedGames = async ({ playerId }) => {
  let latestPlayedGames;

  try {
    latestPlayedGames = await GameBrowserClient.latestPlayedGames({
      playerId,
      pageSize: 20,
    });
  } catch (e) {
    console.error("Latest played games query is unavailable", e);
    latestPlayedGames = [];
  }

  return latestPlayedGames;
};

const gamesByProviderGameNames = async ({
  country,
  platform,
  variant,
  providerGameNames,
}) => {
  let gamesByProviderGameNames;

  try {
    gamesByProviderGameNames = await GameBrowserClient.gamesByProviderGameNames(
      {
        country,
        platform,
        variant,
        providerGameNames,
      }
    );
  } catch (e) {
    console.error("Games by provider name query is unavailable", e);
    gamesByProviderGameNames = [];
  }

  return gamesByProviderGameNames;
};

const gameListMetaDataById = ({ handshake, id }) => {
  return handshake.gamesLists[id];
};

const fetchLatestPlayedGames = async ({
  variant = "default",
  handshake,
  country,
  platform,
  playerId,
} = {}) => {
  const latestPlayedProviderGameNames = await playerLatestPlayedGames({
    playerId,
  });

  if (
    !latestPlayedProviderGameNames ||
    latestPlayedProviderGameNames.length === 0
  ) {
    return null;
  }

  const { id, title } = gameListMetaDataById({
    handshake,
    id: "latestPlayedGames",
  });

  const games = await gamesByProviderGameNames({
    country,
    platform,
    variant,
    providerGameNames: latestPlayedProviderGameNames.map(prop("gameName")),
  });

  return { games: games.games, id, title };
};

export const fetchGames = async ({
  platform,
  country,
  currency,
  market,
  playerId,
  handshake,
}) => {
  const gameFetcherById = {
    // Having multiple listIds for the same type is a bit risky. Let's
    // streamline this.
    liveCasino: (...args) => gameFetcherById.liveCasinoGames(...args),
    liveCasinoGames: async ({
      id,
      variants,
      title,
      variant,
      currency,
      country,
      platform,
    }) => {
      const liveCasinoGamesList = await gameFetcherById.DEFAULT({
        country,
        platform,
        id,
        variants,
        title,
        variant,
      });

      const liveCasinoGamesById = liveCasinoGamesList.games.reduce(
        (accumulator, game) => assoc(game.tableId, game, accumulator),
        {}
      );

      // eslint-disable-next-line fp/no-let
      let liveCasinoTables;

      try {
        // eslint-disable-next-line fp/no-mutation
        liveCasinoTables = await GameBrowserClient.liveCasinoTablesById({
          ids: liveCasinoGamesList.games.map(({ tableId }) => tableId),
          currency,
        });
      } catch (e) {
        console.error("Live casino tables query is unavailable", e);
        liveCasinoTables = [];
      }

      const getImageForTable = compose(
        prop("L"),
        prop("thumbnails"),
        prop("videoSnapshot")
      );

      return {
        ...liveCasinoGamesList,
        games: liveCasinoTables
          .filter(({ open }) => Boolean(open))
          .map(table => ({
            ...liveCasinoGamesById[table.tableId],
            lobby: {
              tableId: table.tableId,
              type: table.gameType,
              image: getImageForTable(table),
              bets: table.betLimits[currency],
              players: table.players,
              results: table.results || table.history || null,
              betBehind: table.betBehind || null,
              seats: table.seatsTaken
                ? table.seats - table.seatsTaken.length
                : null,
              provider: table.provider,
            },
          })),
      };
    },
    DEFAULT: async ({ id, variants, title, variant, platform, country }) => {
      let gamesLists;

      try {
        gamesLists = await GameBrowserClient.gamesLists({
          platform,
          country,
          id: id,
          variant,
          pageSize: 20,
        });
      } catch (e) {
        console.error("Games lists query is unavailable", e);
        gamesLists = [];
      }

      return gamesLists;
    },
  };

  const hasSomeGames = compose(
    i => i > 0,
    prop("length"),
    prop("games")
  );

  const { topListIds, gamesLists } = handshake;
  const jackpots = getJackpots({
    market,
    currencyCode: currency,
  });

  // TODO: If the date is >= 28/11/2018 this function needs to be removed.
  const normaliseLiveCasinoId = id => {
    if (id === "liveCasino") {
      return "liveCasinoGames";
    }
    return id;
  };

  const gameListsRequests = topListIds
    .map(id => prop(id, gamesLists))
    .filter(complement(isNil))
    .map(async ({ title, id, variants, variant = "default" }) => {
      const games = await (gameFetcherById[id] || gameFetcherById.DEFAULT)({
        currency,
        id,
        variants,
        title,
        variant,
        country,
        platform,
      });
      return {
        games: games.games,
        id: normaliseLiveCasinoId(id),
        title,
      };
    });

  const latestPlayedGames = fetchLatestPlayedGames({
    handshake,
    country,
    platform,
    playerId,
  });

  const allListsResponses = (await Promise.all([
    latestPlayedGames,
    ...gameListsRequests,
  ])).filter(hasSomeGames);

  return { gameLists: allListsResponses, jackpots: (await jackpots).jackpots };
};

export default fetchGames;

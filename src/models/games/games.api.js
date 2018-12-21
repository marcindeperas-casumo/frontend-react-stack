import { complement, compose, isNil, prop } from "ramda";

import GameBrowserClient from "Clients/GameBrowserClient";
import { getJackpots } from "Models/jackpots";

const fetchLatestPlayedGames = async ({
  variant = "default",
  handshake,
  country,
  platform,
  playerId,
} = {}) => {
  const latestPlayedProviderGameNames = await GameBrowserClient.latestPlayedGames(
    {
      playerId,
      pageSize: 20,
    }
  );

  if (
    !latestPlayedProviderGameNames ||
    latestPlayedProviderGameNames.length === 0
  ) {
    return null;
  }

  const { id, title } = handshake.gamesLists.latestPlayedGames;
  const games = await GameBrowserClient.gamesByProviderGameNames({
    country,
    platform,
    variant,
    providerGameNames: latestPlayedProviderGameNames.map(prop("gameName")),
  }).then(x => x.games);

  return { games, id, title };
};

const handleLiveCasino = async ({ currency, liveCasinoGamesList }) => {
  const liveCasinoGamesById = liveCasinoGamesList.reduce(
    (acc, game) => ({
      ...acc,
      [game.tableId]: game,
    }),
    {}
  );

  const liveCasinoTables = await GameBrowserClient.liveCasinoTablesById({
    currency,
    ids: liveCasinoGamesList.map(({ tableId }) => tableId),
  });

  const getImageForTable = compose(
    prop("L"),
    prop("thumbnails"),
    prop("videoSnapshot")
  );

  return liveCasinoTables.filter(({ open }) => Boolean(open)).map(table => ({
    ...liveCasinoGamesById[table.tableId],
    lobby: {
      tableId: table.tableId,
      type: table.gameType,
      image: getImageForTable(table),
      bets: table.betLimits[currency],
      players: table.players,
      results: table.results || table.history || null,
      betBehind: table.betBehind || null,
      seats: table.seatsTaken ? table.seats - table.seatsTaken.length : null,
      provider: table.provider,
    },
  }));
};

export const fetchGames = async ({
  platform,
  country,
  currency,
  market,
  playerId,
  handshake,
}) => {
  const gameListsRequests = handshake.topListIds
    .map(id => prop(id, handshake.gamesLists))
    .filter(complement(isNil))
    .map(async ({ title, id, variants, variant = "default" }) => {
      const gamesLists = await GameBrowserClient.gamesLists({
        id,
        variant,
        platform,
        country,
        pageSize: 20,
      }).then(x => x.games);

      if (id === "liveCasinoGames") {
        try {
          const liveCasinoGames = await handleLiveCasino({
            currency,
            liveCasinoGamesList: gamesLists,
          });

          return {
            games: liveCasinoGames,
            id,
            title,
          };
        } catch (e) {
          console.error(
            "Something went wrong while handling live casino games",
            e
          );
          return {};
        }
      }

      return {
        games: gamesLists,
        id,
        title,
      };
    });
  const latestPlayedGames = fetchLatestPlayedGames({
    handshake,
    country,
    platform,
    playerId,
  });
  const hasSomeGames = compose(
    i => i > 0,
    prop("length"),
    prop("games")
  );
  const allListsResponses = (await Promise.all([
    latestPlayedGames,
    ...gameListsRequests,
  ])).filter(hasSomeGames);
  const jackpots = getJackpots({
    market,
    currencyCode: currency,
  });

  return {
    gameLists: allListsResponses,
    jackpots: (await jackpots).jackpots,
  };
};

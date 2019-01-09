import { complement, compose, isNil, prop, path, pluck } from "ramda";

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
    providerGameNames: pluck("gameName", latestPlayedProviderGameNames),
  }).then(prop("games"));

  return { games, id, title };
};

const createAllLiveGamesMap = allLiveGamesList =>
  allLiveGamesList.reduce(
    (acc, game) => ({
      ...acc,
      [game.tableId]: game,
    }),
    {}
  );

/**
 * TODO(mm): i think we should fallback to some default/other size if this
 * thumbnail isn't available
 */
const getImageForTable = path(["videoSnapshot", "thumbnails", "L"]);

const getLiveGames = async ({ currency, allLiveGamesList }) => {
  const allLiveGamesById = createAllLiveGamesMap(allLiveGamesList);

  const liveCasinoTables = await GameBrowserClient.liveCasinoTablesById({
    currency,
    ids: pluck("tableId", allLiveGamesList),
  });

  return liveCasinoTables.filter(({ open }) => Boolean(open)).map(table => ({
    ...allLiveGamesById[table.tableId],
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
      }).then(prop("games"));

      if (id === "liveCasinoGames") {
        try {
          /**
           * It might be confusing, here gamesList contains all available live
           * games and additional logic is required to filter out games that are
           * currently live and get additional data (ie. thumbnails).
           */
          const liveGames = await getLiveGames({
            currency,
            allLiveGamesList: gamesLists,
          });

          return {
            games: liveGames,
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
    path(["games", "length"])
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

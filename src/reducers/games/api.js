import { complement, compose, isNil, prop } from "ramda";
import GameBrowserClient from "Clients/GameBrowserClient";
import JackpotsClient from "Clients/JackpotsClient";

export const fetchGames = async ({
  platform,
  country,
  currency,
  market,
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
        (accumulator, game) => {
          accumulator[game.tableId] = game;
          return accumulator;
        },
        {}
      );

      const liveCasinoTables = await GameBrowserClient.liveCasinoTablesById({
        ids: liveCasinoGamesList.games.map(({ tableId }) => tableId),
        currency,
      });

      const getImageForTable = compose(
        prop("L"),
        prop("thumbnails"),
        prop("videoSnapshot")
      );

      return {
        ...liveCasinoGamesList,
        games: liveCasinoTables.filter(({ open }) => !!open).map(table => ({
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
    DEFAULT: ({ id, variants, title, variant, platform, country }) => {
      return GameBrowserClient.gamesLists({
        platform,
        country,
        id: id,
        variant,
        pageSize: 20,
      });
    },
  };

  const hasSomeGames = compose(
    i => i > 0,
    prop("length"),
    prop("games")
  );

  const { topListIds, gamesLists } = handshake;

  const jackpots = JackpotsClient.jackpots({
    market,
    currencyCode: currency,
  });

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
        id,
        title,
      };
    });

  const allListsResponses = (await Promise.all(gameListsRequests)).filter(
    hasSomeGames
  );

  return { gameLists: allListsResponses, jackpots: (await jackpots).jackpots };
};

export default fetchGames;

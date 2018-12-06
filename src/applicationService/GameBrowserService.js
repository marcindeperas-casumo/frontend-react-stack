import { assoc, complement, compose, isNil, prop } from "ramda";

import { cacheFunction, ServiceConfig, SimpleCache } from "Utils/index";
import GameBrowserClient from "Clients/GameBrowserClient";
import SessionService from "Services/SessionService";

const countryAndPlatform = ({ country, platform }) => ({ country, platform });
export const gameInMaintenanceMode = game => Boolean(game.inMaintenanceMode);

export const GameBrowserServiceFactory = ({
  gameBrowserClient,
  sessionService,
}) => {
  const handshakeCache = SimpleCache();
  const defaultOptions = {
    platform: "mobile",
  };
  const serviceConfig = ServiceConfig({
    defaultOptions,
    cache: SimpleCache(),
  });

  const config = {
    ...serviceConfig,
    set: (...args) => {
      handshakeCache.invalidate();
      serviceConfig.set(...args);
    },
  };

  const cachedHandshake = cacheFunction({
    fn: () => gameBrowserClient.handshake(countryAndPlatform(config.get())),
    cache: handshakeCache,
  });

  const invalidateHandshake = () => handshakeCache.invalidate();

  const playerLatestPlayedGames = async () =>
    gameBrowserClient.latestPlayedGames({
      playerId: await sessionService.playerId(),
      pageSize: 20,
    });

  const gamesByProviderGameNames = async ({
    hash,
    variant,
    providerGameNames,
  }) => {
    return await gameBrowserClient.gamesByProviderGameNames({
      ...countryAndPlatform(config.get()),
      hash,
      variant,
      providerGameNames,
    });
  };

  const gamesBySlugs = async ({ variant = "default", slugs }) => {
    const { variants } = await gameListMetaDataById({ id: "allGames" });
    return gameBrowserClient.gamesBySlugs({
      ...countryAndPlatform(config.get()),
      hash: variants[variant].hash,
      variant,
      slugs,
    });
  };

  const gameListMetaDataById = async ({ id }) => {
    const handshake = await cachedHandshake();
    return handshake.gamesLists[id];
  };

  const latestPlayedGames = async ({ variant = "default" } = {}) => {
    const latestPlayedProviderGameNames = await playerLatestPlayedGames();

    if (
      !latestPlayedProviderGameNames ||
      latestPlayedProviderGameNames.length === 0
    ) {
      return null;
    }

    const { variants } = await gameListMetaDataById({ id: "allGames" });
    const { id, title } = await gameListMetaDataById({
      id: "latestPlayedGames",
    });

    const games = await gamesByProviderGameNames({
      variant,
      hash: variants[variant].hash,
      providerGameNames: latestPlayedProviderGameNames.map(prop("gameName")),
    });

    return { games: games.games, id, title };
  };

  const hasSomeGames = compose(
    i => i > 0,
    prop("length"),
    prop("games")
  );

  const gameFetcherById = {
    // Having multiple listIds for the same type is a bit risky. Let's
    // streamline this.
    liveCasino: (...args) => gameFetcherById.liveCasinoGames(...args),
    liveCasinoGames: async ({ id, variants, title, variant, currency }) => {
      const liveCasinoGamesList = await gameFetcherById.DEFAULT({
        id,
        variants,
        title,
        variant,
      });

      const liveCasinoGamesById = liveCasinoGamesList.games.reduce(
        (accumulator, game) => assoc(game.tableId, game, accumulator),
        {}
      );

      const liveCasinoTables = await gameBrowserClient.liveCasinoTablesById({
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
    DEFAULT: ({ id, variants, title, variant }) => {
      return gameBrowserClient.gamesLists({
        ...countryAndPlatform(config.get()),
        id: id,
        hash: variants[variant].hash,
        variant,
        pageSize: 20,
      });
    },
  };

  const allTopLists = async ({ variant = "default" } = {}) => {
    const handshake = await cachedHandshake();
    const currency = await sessionService.iso4217CurrencyCode();

    const processLiveGames = async ({ id, variants, title }) => {
      // Here we need to specifically load the live casino games differently
      // We will
      //  0. Load the original games list
      //  1. Load the live tables data
      //  2. Merge the data together
      //  3. Return it as if it was a top list
      const games = await (gameFetcherById[id] || gameFetcherById.DEFAULT)({
        currency,
        id,
        variants,
        title,
        variant,
      });

      return { games: games.games, id, title };
    };

    const gameListsRequests = handshake.topListIds
      .map(id => prop(id, handshake.gamesLists))
      .filter(complement(isNil))
      .map(processLiveGames);

    return (await Promise.all(gameListsRequests)).filter(hasSomeGames);
  };

  return {
    invalidateHandshake,
    config,
    allTopLists,
    latestPlayedGames,
    gamesBySlugs,
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClient,
  sessionService: SessionService,
});

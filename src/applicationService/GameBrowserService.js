import {
  cacheFunction,
  compose,
  isNotNullOrUndefined,
  property,
  ServiceConfig,
  SimpleCache,
} from "../lib/utils";
import GameBrowserClient from "../serviceClients/GameBrowserClient";
import SessionService from "./SessionService";

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
      providerGameNames: latestPlayedProviderGameNames.map(
        property("gameName")
      ),
    });

    return { games: games.games, id, title };
  };

  const hasSomeGames = compose(
    i => i > 0,
    property("length"),
    property("games")
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
        (accumulator, game) => {
          accumulator[game.tableId] = game;
          return accumulator;
        },
        {}
      );

      const liveCasinoTables = await gameBrowserClient.liveCasinoTablesById({
        ids: liveCasinoGamesList.games.map(({ tableId }) => tableId),
        currency,
      });

      const getImageForTable = compose(
        property("L"),
        property("thumbnails"),
        property("videoSnapshot")
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
            results: table.results || null,
            betBehind: table.betBehind || null,
            seats: table.seatsTaken
              ? table.seats - table.seatsTaken.length
              : null,
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

    const gameListsRequests = handshake.topListIds
      .map(property)
      .map(propertyFn => propertyFn(handshake.gamesLists))
      .filter(isNotNullOrUndefined)
      .map(async ({ id, variants, title }) => {
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
      });

    return (await Promise.all(gameListsRequests)).filter(hasSomeGames);
  };

  return {
    invalidateHandshake,
    config,
    allTopLists,
    latestPlayedGames,
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClient,
  sessionService: SessionService,
});

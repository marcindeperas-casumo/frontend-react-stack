import {
  cacheFunction,
  compose,
  isNotNullOrUndefined,
  property,
  ServiceConfig,
  SimpleCache,
} from "../utils";
import GameBrowserClient from "../serviceClients/GameBrowserClient";
import SessionService from "./SessionService";

const countryAndPlatform = ({ country, platform }) => ({ country, platform });

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

  const allTopLists = async ({ variant = "default" } = {}) => {
    const handshake = await cachedHandshake();

    const gameListsRequests = handshake.topListIds
      .map(property)
      .map(propertyFn => propertyFn(handshake.gamesLists))
      .filter(isNotNullOrUndefined)
      .map(async ({ id, variants, title }) => {
        const games = await gameBrowserClient.gamesLists({
          ...countryAndPlatform(config.get()),
          id: id,
          hash: variants[variant].hash,
          variant,
          pageSize: 20,
        });

        return { games: games.games, id, title };
      });

    return (await Promise.all([...gameListsRequests])).filter(
      compose(
        i => i > 0,
        property("length"),
        property("games")
      )
    );
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

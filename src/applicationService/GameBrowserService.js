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

const handshakeParams = ({ country, platform }) => ({ country, platform });

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
    fn: () => gameBrowserClient.handshake(handshakeParams(config.get())),
    cache: handshakeCache,
  });

  const invalidateHandshake = () => handshakeCache.invalidate();

  const allTopLists = async ({ variant = "default" } = {}) => {
    const handshake = await cachedHandshake();

    const gameListsRequests = handshake.topListIds
      .map(property)
      .map(propertyFn => propertyFn(handshake.gamesLists))
      .filter(isNotNullOrUndefined)
      .map(async ({ id, variants, title }) => {
        const games = await gameBrowserClient.gamesLists({
          ...handshakeParams(config.get()),
          id: id,
          hash: variants[variant].hash,
          variant,
          pageSize: 20,
        });

        return { games: games.games, id, title };
      });

    const hasSomeGames = compose(
      i => i > 0,
      property("length"),
      property("games")
    );

    return (await Promise.all(gameListsRequests)).filter(hasSomeGames);
  };

  const latestPlayedGames = async () => {
    const playerId = await sessionService.playerId();
    return gameBrowserClient.latestPlayedGames({ playerId, pageSize: 20 });
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

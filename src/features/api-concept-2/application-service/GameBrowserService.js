import { isNullOrUndefined } from "util";
import {
  cacheFunction,
  compose,
  not,
  property,
  ServiceConfig,
  SimpleCache,
  trace
} from "../../../utils";
import GameBrowserClient from "../service-clients/GameBrowserClient";

const notNullOrUndefined = compose(
  not,
  isNullOrUndefined
);

const handshakeParams = ({ country, platform }) => ({ country, platform });

export const GameBrowserServiceFactory = ({ gameBrowserClient }) => {
  const handshakeCache = SimpleCache();
  const defaultOptions = {
    platform: "mobile"
  };
  const serviceConfig = ServiceConfig({
    defaultOptions,
    configCache: SimpleCache()
  });

  const config = {
    ...serviceConfig,
    set: (...args) => {
      handshakeCache.invalidate();
      serviceConfig.set(...args);
    }
  };

  const cachedHandshake = cacheFunction({
    fn: () => gameBrowserClient.handshake(handshakeParams(config.get())),
    cache: handshakeCache
  });

  const invalidateHandshake = () => handshakeCache.invalidate();

  const allTopLists = async ({ variant = "default" } = {}) => {
    const handshake = await cachedHandshake();

    const gameListsRequests = handshake.topListIds
      .map(property)
      .map(propertyFn => propertyFn(handshake.gamesLists))
      .filter(notNullOrUndefined)
      .map(async ({ id, variants, title }) => {
        const games = await gameBrowserClient.gamesLists({
          ...handshakeParams(config.get()),
          id: id,
          hash: variants[variant].hash,
          variant,
          pageSize: 10
        });

        return { games: games.games, id, title };
      });

    return Promise.all(gameListsRequests).then(gameLists =>
      gameLists.filter(
        compose(
          i => i > 0,
          property("length"),
          property("games")
        )
      )
    );
  };

  return {
    invalidateHandshake,
    config,
    allTopLists
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClient
});

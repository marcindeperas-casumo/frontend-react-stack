import { isNullOrUndefined } from "util";
import {
  cacheFunction,
  compose,
  not,
  property,
  ServiceConfig,
  SimpleCache
} from "../../../utils";
import GameBrowserClient from "../service-clients/GameBrowserClient";

const handshakeCache = SimpleCache();
const configCache = SimpleCache();
const defaultOptions = {
  platform: "mobile"
};

const notNullOrUndefined = compose(
  not,
  isNullOrUndefined
);

const handshakeParams = ({ country, platform }) => ({ country, platform });

const serviceConfig = ServiceConfig({ defaultOptions, configCache });
const config = {
  ...serviceConfig,
  set: (...args) => {
    handshakeCache.invalidate();
    serviceConfig.set(...args);
  }
};

export const GameBrowserServiceFactory = ({ gameBrowserClient }) => {
  const cachedHandshake = cacheFunction({
    fn: (options, ...restArgs) =>
      gameBrowserClient.handshake(
        { ...options, ...handshakeParams(configCache.get()) },
        ...restArgs
      ),
    cache: handshakeCache
  });

  const getHash = async ({ id }) => {
    const handshake = await cachedHandshake();
    return handshake.hash[`i${id}`];
  };

  const listItemToItemIdModel = async id => ({
    id,
    hash: await getHash({ id })
  });

  const getIds = async () => {
    const handshake = await cachedHandshake();
    return Promise.all(handshake.topListIds.map(listItemToItemIdModel));
  };

  const invalidateHandshake = () => handshakeCache.invalidate();

  const getAll = async () => {
    const ids = await getIds();

    return Promise.all(
      ids.map(
        async ({ id, hash }) => await gameBrowserClient.getById({ id, hash })
      )
    );
  };

  const allTopLists = async ({ variant = "default" } = {}) => {
    const handshake = await cachedHandshake();

    return Promise.all(
      handshake.topListIds
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
        })
    ).then(gameLists =>
      gameLists.filter(
        compose(
          a => a.length > 0,
          property("games")
        )
      )
    );
  };

  return {
    getIds,
    getAll,
    invalidateHandshake,
    config,
    allTopLists
    // allTopLists
    // topListIds
    // topLists
    // topListGamesByTopListId
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClient
});

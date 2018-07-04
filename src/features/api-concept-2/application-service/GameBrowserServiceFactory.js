import { cacheFunction, SimpleCache } from "../../../utils";
import GameBrowserClientFactory from "../service-clients/GameBrowserClientFactory";

const handshakeCache = SimpleCache();
const configCache = SimpleCache();
const defaultOptions = {};

const config = {
  get: () => {
    return configCache.get();
  },
  set: options => {
    handshakeCache.invalidate();
    configCache.set({
      ...configCache.get(),
      ...defaultOptions,
      ...options
    });
  }
};

const handshakeParams = ({ country }) => ({ country });

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

  return {
    getIds,
    getAll,
    invalidateHandshake,
    config
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClientFactory
});

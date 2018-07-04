import { cacheFunction, ServiceConfig, SimpleCache } from "../../../utils";
import GameBrowserClient from "../service-clients/GameBrowserClient";

const handshakeCache = SimpleCache();
const configCache = SimpleCache();
const defaultOptions = {};

const handshakeParams = ({ country }) => ({ country });

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

  return {
    getIds,
    getAll,
    invalidateHandshake,
    config
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClient
});

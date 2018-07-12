import { cacheFunction, SimpleCache } from "../utils";
import CommonClient from "../serviceClients/CommonClient";

export const CommonServiceFactory = ({ commonClient }) => {
  const handshakeCache = SimpleCache();

  const cachedHandshake = cacheFunction({
    fn: () => commonClient.handshake(),
    cache: handshakeCache
  });

  return {
    handshake: () => cachedHandshake(),
    invalidateHandshake: () => handshakeCache.invalidate()
  };
};

export default CommonServiceFactory({
  commonClient: CommonClient
});

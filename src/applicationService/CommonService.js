import { cacheFunction, SimpleCache } from "Utils/index";
import CommonClient from "Clients/CommonClient";

export const CommonServiceFactory = ({ commonClient }) => {
  const handshakeCache = SimpleCache();

  const cachedHandshake = cacheFunction({
    fn: () => commonClient.handshake(),
    cache: handshakeCache,
  });

  return {
    handshake: () => cachedHandshake(),
    invalidateHandshake: () => handshakeCache.invalidate(),
  };
};

export default CommonServiceFactory({
  commonClient: CommonClient,
});

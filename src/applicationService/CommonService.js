import { cacheFunction, SimpleCache } from "Utils/index";
import CommonClient from "Clients/CommonClient";

export const CommonServiceFactory = ({ commonClient }) => {
  const handshakeCache = SimpleCache();

  const cachedHandshake = cacheFunction({
    fn: () => commonClient.handshake(),
    cache: handshakeCache,
  });

  return {
    // [NOTE]
    //
    // We use this method so we can update the handshake value that was
    // retrieved from the fetch saga, instead of doing another fetch call to
    // retrieve the same data.
    //
    // We need this because this service (and others like it) were created
    // before sagas (sagas were added in the state management branch). While the
    // state management branch was being implemented, other features where being
    // developed that where depending on these services. To bridge the gap
    // between the new features using these obsolete services and the reading
    // the handshake off the store, we are going to use this method that will be
    // called when the application starts (inside the app saga).
    //
    // This is needed because we need to pull the country and the market which
    // will then be used by another service (CMS) to pull in the content for
    // these features. Once the pulling of content is refactored and done via
    // reading off the store we will not need this method and this service as
    // whole.
    obsolete__updateHandshake: handshake => handshakeCache.set(handshake),
    handshake: () => cachedHandshake(),
    invalidateHandshake: () => handshakeCache.invalidate(),
  };
};

export default CommonServiceFactory({
  commonClient: CommonClient,
});

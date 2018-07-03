import GameBrowserClientFactory from "../service-clients/GameBrowserClientFactory";
import handshakeHolderFactory from "./handshakeHolderFactory";

export const GameBrowserServiceFactory = ({
  gameBrowserClient,
  handshakeHolder
}) => {
  const getHandshake = async () => {
    if (handshakeHolder.empty()) {
      handshakeHolder.update(await gameBrowserClient.handshake());
    }

    return handshakeHolder.value();
  };

  const getHash = async ({ id }) => {
    const handshake = await getHandshake();
    return handshake.hash[`i${id}`];
  };
  const getIds = async () => {
    const handshake = await getHandshake();
    return Promise.all(
      handshake.list.map(async id => {
        const hash = await getHash({ id });
        return {
          id,
          hash
        };
      })
    );
  };

  const invalidateHandshake = () => handshakeHolder.invalidate();

  const getAll = async () => {
    const ids = await getIds();

    return Promise.all(
      ids.map(
        async ({ id, hash }) => await gameBrowserClient.getById({ id, hash })
      )
    );
  };

  return {
    invalidateHandshake,
    getIds,
    getAll
  };
};

export default GameBrowserServiceFactory({
  gameBrowserClient: GameBrowserClientFactory,
  handshakeHolder: handshakeHolderFactory()
});

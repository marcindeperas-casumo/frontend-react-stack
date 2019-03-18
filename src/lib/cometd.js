import cometdLib from "cometd";

const CometD = new cometdLib.CometD();

export default CometDFactory(CometD);

export function CometDFactory(cometd) {
  let handshakePromise; // eslint-disable-line fp/no-let

  const context = {
    init,
    subscribe,
    unsubscribe,
  };

  function init(configuration) {
    if (!isInitialised()) {
      cometd.configure(configuration);

      /* eslint-disable-next-line fp/no-mutation */
      handshakePromise = getHandshakePromise();
    }

    return handshakePromise;
  }

  /**
   * Subscribes a callback to a channel name.
   * Use "/*" after the channel name to subscribe to all sub-channels one level deep.
   * Use "/**" after the channel name to subscribe to all sub-channels.
   * @param {string} channel - The name of the channel starting with a "/", e.g. "/foo/bar"
   * @param {function} callback - Called for every new message on the channel with parsed "message.data" property
   * @param {function} onSubscriptionReady - Call
   */
  async function subscribe(
    channel,
    callback,
    args,
    onSubscriptionReady = () => {}
  ) {
    let subscription; // eslint-disable-line fp/no-let

    await context.init();

    return new Promise(resolve => {
      /* eslint-disable-next-line fp/no-mutation */
      subscription = cometd.subscribe(
        channel,
        parseMessage(callback),
        args,
        resolve
      );
    }).then(() => subscription);
  }

  /**
   * Removes an existing subscription
   * @param {string} subscription - The subscription to unsubscribe from.
   */
  async function unsubscribe(subscription) {
    const unsubscribeProps = {};

    await context.init();

    return new Promise(resolve =>
      cometd.unsubscribe(subscription, unsubscribeProps, resolve)
    );
  }

  function isInitialised() {
    return Boolean(handshakePromise);
  }

  function getHandshakePromise() {
    return new Promise((resolve, reject) => {
      cometd.handshake(handshake => {
        if (handshake.successful) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  return context;
}

function parseMessage(callback) {
  return ({ data, channel }) => {
    if (typeof data === "string") {
      callback({ data: JSON.parse(data), channel });
    } else {
      callback({ data, channel });
    }
  };
}

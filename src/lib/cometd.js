import cometdLib from "cometd";

const CometD = new cometdLib.CometD();

export default CometDFactory(CometD);

export function CometDFactory(cometd) {
  let handshakePromise;
  const context = {
    init,
    subscribe,
    unsubscribe,
  };

  function init(configuration) {
    if (!isInitialised()) {
      cometd.configure(configuration);

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
   */
  async function subscribe(channel, callback) {
    await context.init();

    return new Promise(resolve =>
      cometd.subscribe(channel, parseMessage(callback), {}, resolve)
    );
  }

  /**
   * Removes all subscriptions from a channel.
   * @param {string} channel - The name of the channel.
   */
  async function unsubscribe(channel) {
    await context.init();

    return new Promise(resolve => cometd.unsubscribe(channel, {}, resolve));
  }

  function isInitialised() {
    return !!handshakePromise;
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
  return ({ data }) => {
    if (typeof data === "string") {
      callback(JSON.parse(data));
    }

    callback(data);
  };
}

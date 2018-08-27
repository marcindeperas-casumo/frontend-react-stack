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

  async function subscribe(channel, callback) {
    await context.init();

    return new Promise(resolve =>
      cometd.subscribe(channel, parseMessage(callback), {}, resolve)
    );
  }

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

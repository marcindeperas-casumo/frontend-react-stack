const path = window.location.hostname.concat("/api/livecasino/evo");
const urlConn = `wss://${path}`;

const defaultOptions = {
  // attempt to connect immediately upon instantiation
  connectOnOpen: true,
  // attempt to reconnect when on error
  reconnectOnError: false,
  // exponential back-off configuration for auto-reconnect
  reconnectDecay: 1.4,
  reconnectInterval: 1000,
  reconnectIntervalMax: 3000,
  // maximum reconnection attempts to make, infinite if null
  maxReconnectAttempts: null,
  // called clean close should reconnect or not
  reconnectOnCleanClose: false,
};

class LiveCasinoClient {
  CONNECTING = 0;
  OPEN = 1;
  CLOSING = 2;
  CLOSED = 3;

  constructor(url, options = {}) {
    this.url = url || urlConn;
    this.options = Object.assign({}, defaultOptions, options);
    this.reconnectAttempts = 0;
    this.exponentialTimeout = 0;
    this.socketState = this.CONNECTING;
    if (this.options.connectOnOpen) this.open();
  }

  open() {
    this.socket = new WebSocket(this.url);
    if (
      this.options.maxReconnectAttempts &&
      this.options.maxReconnectAttempts < this.reconnectAttempts
    )
      return;

    this._syncState();
    this.socket.onmessage = this._onmessage.bind(this);
    this.socket.onopen = this._onopen.bind(this);
    this.socket.onclose = this._onclose.bind(this);
    this.socket.onerror = this._onerror.bind(this);
  }

  close(code, reason) {
    if (typeof code === "undefined") code = 1000;
    if (this.socket) this.socket.close(code, reason);
  }

  _onmessage(m) {
    const d = JSON.parse(m.data);
    this.onmessage && this.onmessage(d);
  }

  _onopen(e) {
    this._syncState();
    this.reconnectAttempts = 0;
  }

  _onclose(e) {
    this._syncState();
    this._reconnect(e);
    // console.log("LiveCasinoClient: connection closed", e);
  }

  _onerror(e) {
    // Avoids undetermined state, close socket on error
    this.socket.close();
    this._syncState();
    if (this.options.reconnectOnError) this._reconnect(e);
    // console.log("LiveCasinoClient: error", e);
  }

  _reconnect(e) {
    if (e.wasClean && !this.options.reconnectOnCleanClose) return;
    setTimeout(() => {
      if (
        this.socketState === this.CLOSING ||
        this.socketState === this.CLOSED
      ) {
        this.reconnectAttempts++;
        this.open();
      }
    }, this._getExponentialBackOffTimeout());
  }

  _getExponentialBackOffTimeout() {
    const {
      reconnectInterval,
      reconnectDecay,
      reconnectIntervalMax,
    } = this.options;

    const timeout =
      reconnectInterval * Math.pow(reconnectDecay, this.reconnectAttempts);
    this.exponentialTimeout =
      timeout > reconnectIntervalMax ? reconnectIntervalMax : timeout;
    return this.exponentialTimeout;
  }

  _syncState() {
    this.socketState = this.socket.readyState;
  }
}

export default LiveCasinoClient;

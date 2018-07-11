
export default {
  connect () {
    const wsURL = window.location.hostname.concat('/api/lobby/live');
    return new WebSocket(`wss://casumo0000000001:test123@${wsURL}`);
  }
}
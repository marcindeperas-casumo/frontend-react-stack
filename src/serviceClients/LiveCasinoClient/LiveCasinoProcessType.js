// - Compares Live Casino games retrieved from gameBrowser
//   against Evolution Lobby API `State`.

// - Checks type and updates table props accordongly.

export const LiveCasinoProcessType = (dataState, payload) => {
  const d = [...dataState];
  const i = d.findIndex(e => e.id === payload.tableId);
  const exists = i !== -1;

  const liveCasinoGames = d.find(o => o.id === "liveCasinoGames").games;
  const ids = liveCasinoGames.map(g => g.providerGameId);

  const updateProp = prop => {
    if (exists) {
      d[i][prop] = payload[prop];
      return d;
    }
  };

  const types = {
    State: () => {
      const tables = Object.keys(payload.tables)
        .map(k => ({
          ...payload.tables[k],
          id: k,
        }))
        .filter(table => ids.includes(table.id));
      return tables;
    },

    TableUpdated: () => {
      if (exists) {
        d[i] = payload.table;
        d[i].id = payload.tableId;
        return d;
      }
    },

    TableOpened: () => updateProp("open"),
    TableClosed: () => updateProp("open"),
    SeatsUpdated: () => updateProp("seatsTaken"),
    RouletteNumbersUpdated: () => updateProp("results"),
    MoneyWheelNumbersUpdated: () => updateProp("results"),
    PlayersUpdated: () => updateProp("players"),
    default: () => null,
  };
  return (types[payload.type] || types["default"])();
};

export default LiveCasinoProcessType;

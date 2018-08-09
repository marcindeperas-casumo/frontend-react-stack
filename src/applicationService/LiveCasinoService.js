import { ServiceConfig, SimpleCache } from "../utils";
import sessionService from "./SessionService";

export const LiveCasinoService = ({ sessionService }) => {
  const defaultOptions = {
    currency: "EUR",
  };
  const serviceConfig = ServiceConfig({
    defaultOptions,
    cache: SimpleCache(),
  });

  const config = {
    ...serviceConfig,
    set: (...args) => {
      serviceConfig.set(...args);
    },
  };

  const ifLiveCasino = id => ["liveCasinoGames", "liveCasino"].includes(id);

  // Compares Live Casino lobby retrieved from gameBrowser
  // against Evolution Lobby API `State`.
  // Checks type and updates game data accordongly.
  // Returns new lobby state or null.
  const processLobby = ({ games, lobby, payload }) => {
    const lobbyData = [...lobby];
    const i = lobbyData.findIndex(g => g.id === payload.tableId);
    const exists = i !== -1;
    const ids = games.map(g => g.providerGameId);

    const updateProp = prop => {
      if (exists) {
        lobbyData[i][prop] = payload[prop];
        return lobbyData;
      }
    };

    const types = {
      State: () => {
        const newLobbyData = Object.keys(payload.tables)
          .map(k => ({
            ...payload.tables[k],
            id: k,
          }))
          .filter(table => ids.includes(table.id));
        return newLobbyData;
      },

      TableUpdated: () => {
        if (exists) {
          lobbyData[i] = payload.table;
          lobbyData[i].id = payload.tableId;
          return lobbyData;
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

  const getLiveCasinoGames = (list, lobby) => {
    return [...list]
      .filter(o => lobby.find(t => t.id === o.providerGameId))
      .map(o => {
        const t = lobby.find(t => t.id === o.providerGameId);
        const betLimits = t.betLimits[config.get().currency];

        return { ...o, lobby: { ...t, betLimits: betLimits } };
      });
  };

  return {
    config,
    ifLiveCasino,
    processLobby,
    getLiveCasinoGames,
  };
};

export default LiveCasinoService({ sessionService });

import { ServiceConfig, SimpleCache } from "../utils";
import { compose, property } from "../utils";

export const LiveCasinoService = () => {
  const defaultOptions = {
    defaultCurrency: "EUR",
    marketsIds: ["liveCasinoGames", "liveCasino"],
    lobbyLink: "https://evo-livecasino.casumo.com/mobile/index.html",
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

  const ifLiveCasino = id => config.get().marketsIds.includes(id);
  const getLobbyLink = () => config.get().lobbyLink;

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

  const getImageForTable = compose(
    property("M"),
    property("thumbnails"),
    property("videoSnapshot")
  );

  const getBetsForTable = currency => property(currency);
  const getBetsCurrency = (b, c) => getBetsForTable(c)(b);

  const getLiveCasinoGames = (list, lobby) => {
    const currency = config.get().currency;
    const lobbyGames = list.reduce((memo, game) => {
      const table = lobby.find(t => t.id === game.providerGameId);
      if (table) {
        memo.push({
          ...game,
          lobby: {
            players: table.players,
            results: table.results || null,
            image: getImageForTable(table),
            bets: getBetsCurrency(table.betLimits, currency),
            type: table.gameType,
          },
        });
      }
      return memo;
    }, []);
    return lobbyGames;
  };

  return {
    config,
    ifLiveCasino,
    getLobbyLink,
    processLobby,
    getLiveCasinoGames,
  };
};

export default LiveCasinoService();

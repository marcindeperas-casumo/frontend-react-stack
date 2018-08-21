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

  const getIndex = (d, p) => d.findIndex(g => g.id === p.tableId);
  const exists = i => i >= 0;

  const processType = (lobbyData, payload) => {
    const i = getIndex(lobbyData, payload);
    const isInLobby = exists(i);

    const updateProp = prop => {
      if (isInLobby) {
        lobbyData[i][prop] = payload[prop];
        console.log(prop, payload.tableId, lobbyData[i][prop]);
        return lobbyData;
      }
    };

    const type = {
      TableUpdated: () => {
        if (isInLobby) {
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
      default: () => undefined,
    };

    return (type[payload.type] || type["default"])();
  };

  let throttleNow = new Date();
  let throttleMemo = [];
  const processLobby = ({ games, lobby, payload }, limit = 10000) => {
    const lobbyData = [...lobby];
    const i = getIndex(lobbyData, payload);
    const isInLobby = exists(i);
    const ids = games.map(g => g.providerGameId);

    const timestamp = new Date();
    const throttle = time => {
      if (time - throttleNow < limit) {
        const m = throttleMemo.findIndex(g => g.tableId === payload.tableId);
        const isInMemo = exists(m);
        if (isInLobby) {
          if (isInMemo) throttleMemo[m] = payload;
          else throttleMemo.push(payload);
        }
        return;
      } else {
        console.log("throttling pass");
        const memo = [...throttleMemo];
        throttleMemo = [];
        throttleNow = new Date();
        let l;
        memo.forEach(d => (l = processType(lobbyData, d)));
        return l;
      }
    };

    const processState = () => {
      const newLobbyData = Object.keys(payload.tables)
        .map(k => ({
          ...payload.tables[k],
          id: k,
        }))
        .filter(table => ids.includes(table.id));
      return newLobbyData;
    };

    if (payload.type === "State") return processState(lobbyData, payload);
    if (limit !== 0) return throttle(timestamp);
    else return processType(lobbyData, payload);
  };

  const getBetsForTable = currency => property(currency);
  const getBetsCurrency = (b, c) => getBetsForTable(c)(b);
  const getImageForTable = compose(
    property("L"),
    property("thumbnails"),
    property("videoSnapshot")
  );

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

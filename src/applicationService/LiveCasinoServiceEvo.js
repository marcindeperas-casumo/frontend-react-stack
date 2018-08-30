import { ServiceConfig, SimpleCache } from "../lib/utils";
import { compose, property } from "../lib/utils";

const getIndex = (d, p) => d.findIndex(g => g.id === p.tableId);
const exists = i => i >= 0;
const getBetsForTable = currency => property(currency);
const getBetsCurrency = (b, c) => getBetsForTable(c)(b);
const getImageForTable = compose(
  property("L"),
  property("thumbnails"),
  property("videoSnapshot")
);

export const LiveCasinoServiceEvo = () => {
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

  // processes push updates types from websocket client
  // returns updated lobby list or undefined
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
  // sets initial lobby State data as first payload
  // then implements throttling updating UI every 10 second
  // by default with latest data and clear the memo
  const processLobby = ({ games, lobby, payload }, limit = 10000) => {
    const lobbyData = [...lobby];
    const i = getIndex(lobbyData, payload);
    const isInLobby = exists(i);

    const ids = games.map(g => {
      const id =
        g.providerGameId === "lnte5m7j7jdaadpm"
          ? "lnqzgbjt756qbnoj"
          : g.providerGameId;
      const table = lobby.find(t => t.id === id);
      return {
        id,
        type: table ? table.gameType : null,
      };
    });

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
        .filter(table => ids.find(t => t.id === table.id));
      return newLobbyData;
    };

    const blackjackGameType = id => {
      const o = ids.find(t => t.id === id);
      return o ? o.type === "Blackjack" : false;
    };

    // this would be the first payload received
    if (payload.type === "State") return processState(lobbyData, payload);
    // for the rest check if throttling is active and game is not blackjack type
    if (limit !== 0 && !blackjackGameType(payload.tableId))
      return throttle(timestamp);
    // otherwise update the UI
    else return processType(lobbyData, payload);
  };

  // compares games list from cms against lobby data
  // returns lobby list of games with lobby data
  const getLiveCasinoGames = (games, lobby) => {
    const currency = config.get().currency;
    const lobbyGames = games.reduce((memo, game) => {
      // const table = lobby.find(t => t.id === game.providerGameId);
      const table =
        game.providerGameId === "lnte5m7j7jdaadpm"
          ? lobby.find(t => t.id === "lnqzgbjt756qbnoj")
          : lobby.find(t => t.id === game.providerGameId);

      if (table) {
        memo.push({
          ...game,
          lobby: {
            type: table.gameType,
            image: getImageForTable(table),
            bets: getBetsCurrency(table.betLimits, currency),
            players: table.players,
            results: table.results || null,
            betBehind: table.betBehind || null,
            seats: table.seatsTaken
              ? table.seats - table.seatsTaken.length
              : null,
          },
        });
      }
      return memo;
    }, []);
    return lobbyGames;
  };

  const ifLiveCasinoId = id => config.get().marketsIds.includes(id);
  const getLobbyLink = () => config.get().lobbyLink;

  return {
    config,
    processLobby,
    getLiveCasinoGames,
    ifLiveCasinoId,
    getLobbyLink,
  };
};

export default LiveCasinoServiceEvo();

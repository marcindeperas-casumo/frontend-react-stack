import GameBrowserClient from "Clients/GameBrowserClient";
import { normalize, schema } from "normalizr";
import { complement, compose, isNil, prop } from "ramda";
import { types as appTypes } from "Reducers/app";
import { addEntities } from "Reducers/entities";
import { types as fetchTypes } from "Reducers/fetch";
import { types as gamesTypes } from "Reducers/games/actions";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import { appSaga } from "Sagas/app";
import { fetchSaga } from "Sagas/fetch";
import { trace } from "Utils/utils";

const jackpot = new schema.Entity("jackpot", {}, { idAttribute: "jackpotId" });

const liveCasino = new schema.Entity(
  "liveCasino",
  {},
  {
    idAttribute: "tableId",
  }
);

const g = new schema.Entity(
  "games",
  { lobby: liveCasino, jackpot: jackpot },
  { idAttribute: "slug" }
);
const l = new schema.Entity("lists", { games: [g] });

const allLists = async ({ platform, country, currency }) => {
  const gameFetcherById = {
    // Having multiple listIds for the same type is a bit risky. Let's
    // streamline this.
    liveCasino: (...args) => gameFetcherById.liveCasinoGames(...args),
    liveCasinoGames: async ({
      id,
      variants,
      title,
      variant,
      currency,
      country,
      platform,
    }) => {
      const liveCasinoGamesList = await gameFetcherById.DEFAULT({
        country,
        platform,
        id,
        variants,
        title,
        variant,
      });

      const liveCasinoGamesById = liveCasinoGamesList.games.reduce(
        (accumulator, game) => {
          accumulator[game.tableId] = game;
          return accumulator;
        },
        {}
      );

      const liveCasinoTables = await GameBrowserClient.liveCasinoTablesById({
        ids: liveCasinoGamesList.games.map(({ tableId }) => tableId),
        currency,
      });

      const getImageForTable = compose(
        prop("L"),
        prop("thumbnails"),
        prop("videoSnapshot")
      );

      return {
        ...liveCasinoGamesList,
        games: liveCasinoTables.filter(({ open }) => !!open).map(table => ({
          ...liveCasinoGamesById[table.tableId],
          lobby: {
            tableId: table.tableId,
            type: table.gameType,
            image: getImageForTable(table),
            bets: table.betLimits[currency],
            players: table.players,
            results: table.results || table.history || null,
            betBehind: table.betBehind || null,
            seats: table.seatsTaken
              ? table.seats - table.seatsTaken.length
              : null,
            provider: table.provider,
          },
        })),
      };
    },
    DEFAULT: ({ id, variants, title, variant, platform, country }) => {
      return GameBrowserClient.gamesLists({
        platform,
        country,
        id: id,
        hash: variants[variant].hash,
        variant,
        pageSize: 20,
      });
    },
  };

  const hasSomeGames = compose(
    i => i > 0,
    prop("length"),
    prop("games")
  );

  const { topListIds, gamesLists } = await GameBrowserClient.handshake({
    platform,
    country,
  });

  const gameListsRequests = topListIds
    .map(id => prop(id, gamesLists))
    .filter(complement(isNil))
    .map(async ({ title, id, hash, variants, variant = "default" }) => {
      const games = await (gameFetcherById[trace(id)] ||
        gameFetcherById.DEFAULT)({
        currency,
        id,
        variants,
        title,
        variant,
        country,
        platform,
      });
      return {
        games: games.games.map(x => ({
          ...x,
          jackpot: { jackpotId: x.jackpotId },
        })),
        id,
        title,
      };
    });

  const allListsResponses = (await Promise.all(gameListsRequests)).filter(
    hasSomeGames
  );

  return allListsResponses;
};

export default function* rootSaga() {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
  yield fork(takeEvery, gamesTypes.FETCH_TOP_LISTS, function*() {
    yield put({
      type: fetchTypes.FETCH,
      name: "TOP_LISTS",
      postFetch: "GET_LIST",
      asyncCall: () => {
        const country = "mt";
        const platform = "mobile";
        const currency = "EUR";
        return allLists({ country, platform, currency });
      },
    });
  });
  yield fork(takeEvery, "GET_LIST", function*(action) {
    const { response } = action;

    const noramlizedData = yield call(() => normalize(response, [l]));
    yield put({
      type: "ADD_ENTITIES",
      payload: noramlizedData,
    });
    yield put(addEntities(noramlizedData.entities));
  });
}

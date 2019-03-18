import { pluck } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector, currencySelector } from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { normalizeTableData } from "Api/api.games";
import {
  fetchAllLiveGames,
  fetchMissingLiveTables,
} from "./liveCasino.actions";
import { types } from "./liveCasino.constants";

export function* fetchAllLiveCasinoGamesSaga() {
  const country = yield select(countrySelector);
  const currency = yield select(currencySelector);
  yield put(fetchAllLiveGames({ country }));
  const {
    response: { games },
  } = yield take(types.FETCH_ALL_LIVE_GAMES_COMPLETE);
  yield put(fetchMissingLiveTables({ ids: pluck("tableId", games), currency }));
  const { entities: normalizedGames } = yield call(normalizeData, { games });
  yield put(updateEntity(normalizedGames));
  const { response } = yield take(types.FETCH_TABLES_DATA_COMPLETE);
  // TODO(mm): this normalization should probably live inside selector, it's for compatibility with data from toplist LiveCasino section
  const liveTables = response.map(table => normalizeTableData(currency, table));
  const { entities: normalizedLiveTables } = yield call(normalizeData, {
    liveTables,
  });
  yield put(updateEntity(normalizedLiveTables));
}

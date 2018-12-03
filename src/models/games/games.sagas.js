import {
  country as countrySelector,
  currency as currencySelector,
  playerId as playerIdSelector,
  fetchGamesHandshake,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
  market as marketSelector,
} from "Models/handshake";
import { actions as schemaActions } from "Models/schema";
import { normalizeData } from "Models/schema/schema";
import { call, put, select, take } from "redux-saga/effects";
import { waitForSelector } from "Sagas/utils";
import { launchGame } from "Services/LaunchGameService";
import { fetchTopLists } from "./games.actions";
import { types } from "./games.constants";

export function* fetchGameListSaga() {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const currency = yield select(currencySelector);
  const market = yield select(marketSelector);
  const playerId = yield select(playerIdSelector);

  // Start by fetch the games handshake, this will later be used to supply
  // parameters for subsequent games api requests. Dispatch an action that will
  // handle the fetching of the games handshake
  yield put(fetchGamesHandshake({ country }));

  // Now pause the execution while we wait for the selector that the games
  // handshake is loaded to return true
  yield call(waitForSelector, isGamesHandshakeLoaded);

  const handshake = yield select(gamesHandshakeSelector);

  yield put(
    fetchTopLists({
      handshake,
      country,
      platform,
      currency,
      market,
      playerId,
    })
  );

  // Pause execution until the fetch top lists request is completed, then
  // normalize and update the store
  const { response } = yield take(types.FETCH_TOP_LISTS_COMPLETE);
  const { entities } = yield call(normalizeData, response);
  yield put(schemaActions.updateEntity(entities));
}

export function* launchGameSaga(action) {
  const { slug } = action;

  yield call(launchGame, { slug });
}

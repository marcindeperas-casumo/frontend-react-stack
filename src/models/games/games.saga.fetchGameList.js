import { call, put, select, take } from "redux-saga/effects";
import {
  countrySelector,
  currencySelector,
  playerIdSelector,
  fetchGamesHandshake,
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
  marketSelector,
  sessionIdSelector,
  types as handshakeTypes,
} from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { isFetchingStarted } from "Models/fetch";
import { waitForSelector } from "Utils";
import { fetchTopLists } from "./games.actions";
import { types } from "./games.constants";

export function* fetchGameListSaga() {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const currency = yield select(currencySelector);
  const market = yield select(marketSelector);
  const playerId = yield select(playerIdSelector);
  const areGamesFetched = yield select(
    isFetchingStarted(handshakeTypes.FETCH_GAMES_HANDSHAKE)
  );

  if (areGamesFetched) {
    return;
  }

  // Start by fetch the games handshake, this will later be used to supply
  // parameters for subsequent games api requests. Dispatch an action that will
  // handle the fetching of the games handshake
  yield put(fetchGamesHandshake({ country }));

  // Now pause the execution while we wait for the selector that the games
  // handshake is loaded to return true
  yield call(waitForSelector, isGamesHandshakeLoaded);

  const handshake = yield select(gamesHandshakeSelector);
  const sessionId = yield select(sessionIdSelector);

  yield put(
    fetchTopLists({
      sessionId,
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
  yield put(updateEntity(entities));
}

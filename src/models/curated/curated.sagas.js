import { select, put, take, call } from "redux-saga/effects";
import { types, curatedSelector, fetchCuratedGame } from "Models/curated";
import { country as getCountry } from "Models/handshake/selectors";
import { normalizeData } from "Models/schema/schema";
import { actions as schemaActions } from "Models/schema";

export function* fetchCuratedGameSaga() {
  const curated = yield select(curatedSelector());
  const { gameData, game } = curated;

  if (gameData) {
    return;
  }

  const platform = "mobile";
  const slugs = game;
  const variant = "default";
  const country = yield select(getCountry);
  yield put(fetchCuratedGame({ platform, country, slugs, variant }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(types.CURATED_FETCH_GAME_COMPLETE);
  const { entities } = yield call(normalizeData, response);
  yield put(schemaActions.updateEntity(entities));
}

export function* fetchGamesFromIdsSaga(action) {
  const { slugs } = action;

  const platform = "mobile";
  const variant = "default";
  const country = yield select(getCountry);
  yield put(fetchCuratedGame({ platform, country, slugs, variant }));
}

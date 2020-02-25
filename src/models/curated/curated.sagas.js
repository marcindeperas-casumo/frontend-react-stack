import { select, put, take, call } from "redux-saga/effects";
import { pathOr } from "ramda";
import {
  types,
  curatedSelector,
  fetchCuratedGame,
  prefixCuratedSlug,
} from "Models/curated";
import { normalizeData, updateEntity } from "Models/schema";
import { countrySelector } from "Models/handshake";

export function* fetchCuratedGameSaga(action) {
  const platform = "mobile";
  const pageSlug = pathOr(null, ["response", "slug"], action);

  if (!pageSlug) {
    return;
  }

  const curated = yield select(curatedSelector(prefixCuratedSlug(pageSlug)));
  const country = yield select(countrySelector);

  const { gameData } = curated;

  if (gameData) {
    return;
  }

  const slugs = pathOr([], ["response", "fields", "game"], action);

  yield put(fetchCuratedGame({ platform, country, slugs }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(types.CURATED_FETCH_GAME_COMPLETE);
  const { entities } = yield call(normalizeData, response);
  yield put(updateEntity(entities));
}

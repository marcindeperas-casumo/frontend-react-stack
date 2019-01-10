import { select, put, take, call } from "redux-saga/effects";
import {
  types,
  curatedSelector,
  fetchCuratedGame,
  CURATED_SLUG,
} from "Models/curated";
import { normalizeData, updateEntity } from "Models/schema";

export function* fetchCuratedGameSaga(action) {
  const { type } = action;
  const gameId = type.split(".")[1];
  const slug = `${CURATED_SLUG}.${gameId}`;
  const curated = yield select(curatedSelector(slug));

  const { gameData } = curated;

  if (gameData) {
    return;
  }

  const slugs = [gameId];

  yield put(fetchCuratedGame({ slugs }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(types.CURATED_FETCH_GAME_COMPLETE);
  const { entities } = yield call(normalizeData, response);
  yield put(updateEntity(entities));
}

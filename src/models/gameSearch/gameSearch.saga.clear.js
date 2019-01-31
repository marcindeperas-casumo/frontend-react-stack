import { call, put } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { listTypes } from "Models/gameSearch";

export function* clearSearchSaga() {
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: listTypes.GAME_SEARCH,
      games: [],
    },
  });

  yield put(updateEntity(entities));
}

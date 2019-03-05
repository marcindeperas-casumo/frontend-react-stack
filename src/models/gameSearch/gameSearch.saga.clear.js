import { call, put } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

export function* clearSearchResultsSaga() {
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.GAME_SEARCH,
      games: [],
    },
  });

  yield put(updateEntity(entities));
}

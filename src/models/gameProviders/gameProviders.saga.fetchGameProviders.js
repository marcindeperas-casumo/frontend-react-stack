import { call, put, take } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { initiateFetchGameProviders } from "./gameProviders.actions";
import { types } from "./gameProviders.constants";

export function* fetchGameProvidersSaga() {
  yield put(initiateFetchGameProviders());

  const { response } = yield take(types.FETCH_GAME_PROVIDERS_COMPLETE);
  const { entities } = yield call(normalizeData, {
    [`${ENTITY_KEYS.GAME_PROVIDER}s`]: response,
  });
  yield put(mergeEntity(entities));
}

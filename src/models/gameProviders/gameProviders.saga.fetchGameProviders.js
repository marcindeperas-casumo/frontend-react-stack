import { select, call, put, take } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { sessionIdSelector } from "Models/handshake";
import { initiateFetchGameProviders } from "./gameProviders.actions";
import { types } from "./gameProviders.constants";

export function* fetchGameProvidersSaga() {
  const sessionId = yield select(sessionIdSelector);
  yield put(initiateFetchGameProviders({ sessionId }));

  const { response } = yield take(types.FETCH_GAME_PROVIDERS_COMPLETE);
  const { entities } = yield call(normalizeData, {
    [`${ENTITY_KEYS.GAME_PROVIDER}s`]: response.gameStudios,
  });
  yield put(mergeEntity(entities));
}

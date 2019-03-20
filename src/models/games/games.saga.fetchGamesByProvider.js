import { isEmpty, isNil } from "ramda";
import { call, put, take, select } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { sessionIdSelector } from "Models/handshake";
import {
  gameProviderBySlug,
  fetchGameProviders,
  areGameProvidersLoaded,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { waitForSelector } from "Utils";
import { requestError } from "Models/fetch";
import { types } from "./games.constants";
import { initiateFetchGamesByProvider } from "./games.actions";

export function* fetchGamesByProviderSaga({ provider }) {
  yield put(fetchGameProviders());
  yield call(waitForSelector, areGameProvidersLoaded);

  const providerData = yield select(gameProviderBySlug(provider));
  if (isNil(providerData) || isEmpty(providerData)) {
    yield put(
      requestError(gameProviderTypes.GET_GAME_PROVIDER_ERROR, "Provider error")
    );
    return;
  }

  const sessionId = yield select(sessionIdSelector);
  yield put(initiateFetchGamesByProvider({ provider, sessionId }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(types.FETCH_GAMES_BY_PROVIDER_COMPLETE);
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_PROVIDER]: {
      slug: provider,
      games: response,
    },
  });
  yield put(mergeEntity(entities));
}

import { call, put, take, select } from "redux-saga/effects";
import { isEmpty, isNil } from "ramda";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { sessionId as session } from "Models/handshake";
import { initiateFetchGamesByProvider } from "./games.actions";
import {
  gameProviderBySlug,
  fetchGameProviders,
  areGameProvidersLoaded,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { types } from "./games.constants";
import { waitForSelector } from "Utils";
import { requestError } from "Models/fetch";

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

  const sessionId = yield select(session);
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

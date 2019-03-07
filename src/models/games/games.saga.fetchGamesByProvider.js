import { call, put, take, select } from "redux-saga/effects";
import { normalizeData, mergeEntity, ENTITY_KEYS } from "Models/schema";
import { sessionId } from "Models/handshake";
import { initiateFetchGamesByProvider } from "./games.actions";
import {
  getGameProvider,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { types } from "./games.constants";

export function* fetchGamesByProviderSaga({ provider }) {
  yield put(getGameProvider(provider));
  yield take(gameProviderTypes.GET_GAME_PROVIDER_SUCCESS);

  const session = yield select(sessionId);
  yield put(initiateFetchGamesByProvider({ provider, sessionId: session }));

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

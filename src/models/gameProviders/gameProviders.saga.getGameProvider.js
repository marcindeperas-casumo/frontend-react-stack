import { call, put, select } from "redux-saga/effects";
import { isEmpty } from "ramda";
import { types } from "./gameProviders.constants";
import {
  areGameProvidersLoaded,
  gameProviderBySlug,
} from "./gameProviders.selectors";
import { waitForSelector } from "Utils/";
import { requestError } from "Models/fetch";
import {
  fetchGameProviders,
  getGameProviderSuccess,
} from "./gameProviders.actions";

export function* getGameProviderSaga({ provider }) {
  yield put(fetchGameProviders());
  yield call(waitForSelector, areGameProvidersLoaded);

  const providerData = yield select(gameProviderBySlug(provider));

  if (isEmpty(providerData)) {
    yield put(
      requestError(types.GET_GAME_PROVIDER_ERROR, "Provider doesn't exist")
    );
    return;
  }
  yield put(getGameProviderSuccess());
}

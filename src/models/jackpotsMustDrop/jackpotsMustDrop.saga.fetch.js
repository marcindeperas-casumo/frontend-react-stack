import { put, take, select } from "redux-saga/effects";
import { updateEntity } from "Models/schema";
import { currencySelector } from "Models/handshake";
import {
  shouldFetchJackpotsMustDrop,
  initiateFetchJackpotsMustDrop,
  TYPES,
} from "Models/jackpotsMustDrop";

export function* fetchJackpotsMustDropSaga() {
  const shouldFetch = yield select(shouldFetchJackpotsMustDrop);

  if (shouldFetch) {
    const currency = yield select(currencySelector);

    yield put(initiateFetchJackpotsMustDrop({ currency }));

    const { response } = yield take(TYPES.FETCH_COMPLETE);

    // We don't normalize data here because the service does it for us.
    yield put(updateEntity({ jackpotMustDrop: response }));
  }
}

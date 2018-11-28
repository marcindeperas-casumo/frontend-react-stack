import { put, take, select } from "redux-saga/effects";
import { actions as schemaActions } from "Models/schema";
import { currency as currencySelector } from "Models/handshake/selectors";
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
    yield put(schemaActions.updateEntity({ jackpotMustDrop: response }));
  }
}

// @flow
import { type Saga } from "redux-saga";
import { put, select, call, take } from "redux-saga/effects";
import * as R from "ramda";
import { waitForSelector } from "Utils";
import { jurisdictionSelector, playerIdSelector } from "Models/handshake";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { isFetchingStarted, isFetched } from "Models/fetch";
import { types, getAllLimits, loginTimeLimitsSelector } from "Models/playOkay";
import { JURISDICTIONS, REACT_APP_MODAL } from "Src/constants";

export function* appStartedSaga(): Saga {
  yield call(waitForSelector, playerIdSelector);
  yield call(waitForSelector, jurisdictionSelector);

  const playerId = yield select(playerIdSelector);
  const jurisdiction = yield select(jurisdictionSelector);

  // currently only SGA is handled by this flow
  if (jurisdiction !== JURISDICTIONS.SGA) {
    return;
  }

  const isFetchingAllLimits = yield select(
    isFetchingStarted(types.PLAYOK_FETCH_ALL_LIMITS_START)
  );

  if (!isFetchingAllLimits) {
    yield put(getAllLimits({ playerId }));
  }

  const isFetchedAllLimits = yield select(
    isFetched(types.PLAYOK_FETCH_ALL_LIMITS_START)
  );

  if (!isFetchedAllLimits) {
    yield take(types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED);
  }

  const loginTimeLimits = yield select(loginTimeLimitsSelector);

  if (R.length(loginTimeLimits) < 3) {
    // wait till any previous modal has been closed
    yield call(waitForSelector, isModalHiddenSelector);

    yield put(
      showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM, { mustAccept: true })
    );
  }
}

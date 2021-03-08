// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../../node_modules/redux-saga"' has... Remove this comment to see the full error message
import type { Saga } from "redux-saga";
import { put, select, call, take } from "redux-saga/effects";
import { waitForSelector } from "Utils";
import { jurisdictionSelector, playerIdSelector } from "Models/handshake";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { isFetchingStarted, isFetched } from "Models/fetch";
import {
  types,
  getAllLimits,
  allLoginTimeLimitsDefinedSelector,
} from "Models/playOkay";
import { JURISDICTIONS, REACT_APP_MODAL } from "Src/constants";

export function* appStartedSaga(): Saga {
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, playerIdSelector);
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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

  const allLimitsDefined = yield select(allLoginTimeLimitsDefinedSelector);

  if (!allLimitsDefined) {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    yield call(waitForSelector, isModalHiddenSelector);

    yield put(
      showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM, { mustAccept: true })
    );
  }
}

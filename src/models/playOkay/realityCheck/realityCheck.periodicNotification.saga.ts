// @flow
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../../node_modules/redux-saga"' has... Remove this comment to see the full error message
import { type Saga } from "redux-saga";
import { put, select, call } from "redux-saga/effects";
import { showModal, isModalOpenSelector } from "Models/modal";
import { jurisdictionSelector } from "Models/handshake";
import { REACT_APP_MODAL, JURISDICTIONS } from "Src/constants";
import { waitForSelector } from "Utils";

export function* periodicNotificationSaga(): Saga {
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, jurisdictionSelector);

  const jurisdiction = yield select(jurisdictionSelector);

  if (jurisdiction !== JURISDICTIONS.SGA) {
    return;
  }

  const isModalOpen = yield select(isModalOpenSelector);

  if (isModalOpen) {
    return;
  }

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
  yield put(showModal(REACT_APP_MODAL.ID.REALITY_CHECK));
}

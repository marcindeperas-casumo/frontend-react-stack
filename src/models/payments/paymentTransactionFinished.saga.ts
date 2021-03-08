import { put } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { PAYMENT_RESULT_STATUS } from "Components/RSModal/Payments/PaymentResult.types";
import { actionTypes } from "./payments.constants";

export function* paymentTransactionFinishedSaga(action) {
  const { amount, errorKeys = [] } = action.payload;

  if (action.type === actionTypes.PAYMENT_USE_ERROR) {
    yield put(
      showModal(REACT_APP_MODAL.ID.PAYMENT_RESULT, {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ amount: any; errorKeys: any; s... Remove this comment to see the full error message
        amount,
        errorKeys,
        status: PAYMENT_RESULT_STATUS.fail,
      })
    );
  }

  if (action.type === actionTypes.PAYMENT_USE_SUCCESS) {
    yield put(
      showModal(REACT_APP_MODAL.ID.PAYMENT_RESULT, {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ amount: any; status: string; }... Remove this comment to see the full error message
        amount,
        status: PAYMENT_RESULT_STATUS.success,
      })
    );
  }
  return yield 1;
}

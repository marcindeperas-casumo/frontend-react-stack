// @flow
import { put, select, call, take } from "redux-saga/effects";
import {
  TRANSACTION_ACTION_TYPE,
  CHANNEL,
  PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE,
} from "Models/payments";
import { isMobile } from "Components/ResponsiveLayout";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import {
  playerIdSelector,
  piqConfigSelector,
  localeSelector,
} from "Models/handshake";
import { makePIQDepositRequest } from "Api/api.payments";
import { actionTypes } from "./payments.constants";
import {
  setPaymentRequestProcessing,
  setPaymentRequestFinished,
  methodUseSuccess,
  methodUseError,
} from "./payments.actions";
import type { StartQuickDepositActionReturnType } from "./payments.types";

export function* usePaymentMethodSaga(
  action: StartQuickDepositActionReturnType
): * {
  const userId = yield select(playerIdSelector);
  const locale = yield select(localeSelector); //check if it's ok to pass full locale or just two letters
  const { merchantId, apiUrl } = yield select(piqConfigSelector);
  const { cvvEncoded, amount, paymentMethod } = action.payload;

  const baseUrl = window.location.origin;
  const redirectUrl = `${baseUrl}/payment/v2`;

  yield put(setPaymentRequestProcessing());

  //add affiliateId, add gaClientId

  //eslint-disable-next-line no-template-curly-in-string
  const ptxIdTemplate = "?txId=${ptx.id}";

  const payload = {
    accountId: paymentMethod.token,
    encCvv: cvvEncoded,
    amount: amount,
    attributes: {
      successUrl: `${redirectUrl}/finished.html${ptxIdTemplate}`,
      failureUrl: `${redirectUrl}/failed.html${ptxIdTemplate}`,
      canceledUrl: `${redirectUrl}/canceled.html${ptxIdTemplate}`,
      pendingUrl: `${redirectUrl}/pending.html${ptxIdTemplate}`,
      type: TRANSACTION_ACTION_TYPE.QUICK_DEPOSIT,
      channelId: isMobile ? CHANNEL.MOBILE : CHANNEL.DESKTOP,
    },
    merchantId,
    userId,
  };

  const response = yield call(
    makePIQDepositRequest,
    apiUrl,
    "creditcard", //do proper mapping and use param instead of static value here
    payload,
    locale
  );

  //@todo: @lukKowalski, add payment tracking
  //@todo: remove sensitive data before that, look for removeSensitiveDataFromPiqErrors in KO code

  const { redirectOutput, success } = response;

  if (!success) {
    // dispatch error
    // track error
    yield put(setPaymentRequestFinished());
    return yield put(methodUseError({ amount }));
  }

  if (redirectOutput) {
    if (redirectOutput.url) {
      yield put(
        showModal(REACT_APP_MODAL.ID.PIQ_REDIRECTION_IFRAME_MODAL, {
          redirectOutput,
        })
      );

      // canceled (when modal closed), error, success etc.
      const piqIframeResolution = yield take(actionTypes.PIQ_IFRAME_RESOLVE);
      const { status } = piqIframeResolution.payload;

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.MODAL_CLOSED) {
        // track cancel
        return yield put(setPaymentRequestFinished());
      }

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.FINISHED) {
        yield put(setPaymentRequestFinished());
        return yield put(methodUseSuccess({ amount }));
        // track success
      }

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.FAILED) {
        yield put(setPaymentRequestFinished());
        // do a call to getTransactionStatus to get detailed error if possible
        return yield put(methodUseError({ amount }));
      }
    } else {
      // @todo when doing FULL version:
      // handle other cases of redirection, FULL WINDOW etc (KO stack PiqRedirection.js)
    }
  }

  yield put(setPaymentRequestFinished());
  return yield put(methodUseSuccess({ amount }));
}

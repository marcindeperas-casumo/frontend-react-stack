import { put, select, call, take } from "redux-saga/effects";
import {
  TRANSACTION_ACTION_TYPE,
  CHANNEL,
  PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE,
} from "Models/payments";
import tracker from "Services/tracker";
import { isMobile } from "Components/ResponsiveLayout";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL, EVENTS } from "Src/constants";
import {
  playerIdSelector,
  piqConfigSelector,
  localeSelector,
} from "Models/handshake";
import { makePIQDepositRequest } from "Api/api.payments";
import { extractErrorKeys } from "./utils";
import { actionTypes } from "./payments.constants";
import {
  setPaymentRequestProcessing,
  setPaymentRequestFinished,
  methodUseSuccess,
  methodUseError,
} from "./payments.actions";
import type { StartQuickDepositActionReturnType } from "./payments.types";

export function* makePaymentTransactionSaga(
  action: StartQuickDepositActionReturnType
) {
  const userId = yield select(playerIdSelector);
  const locale = yield select(localeSelector);
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
    call(tracker.track, EVENTS.MIXPANEL_QUICK_DEPOSIT_3DS_STEP_FAILED, {});

    yield put(setPaymentRequestFinished());
    return yield put(
      methodUseError({
        amount,
        errorKeys: extractErrorKeys(response),
      })
    );
  }

  if (redirectOutput) {
    if (redirectOutput.url) {
      call(tracker.track, EVENTS.MIXPANEL_QUICK_DEPOSIT_3DS_STEP_STARTED, {});

      yield put(
        showModal(REACT_APP_MODAL.ID.PIQ_REDIRECTION_IFRAME_MODAL, {
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ redirectOutput: any; }' is not... Remove this comment to see the full error message
          redirectOutput,
        })
      );

      // canceled (when modal closed), error, success etc.
      const piqIframeResolution = yield take(actionTypes.PIQ_IFRAME_RESOLVE);
      const { status } = piqIframeResolution.payload;

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.MODAL_CLOSED) {
        return yield put(setPaymentRequestFinished());
      }

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.FINISHED) {
        call(tracker.track, EVENTS.MIXPANEL_QUICK_DEPOSIT_3DS_STEP_SUCCESS, {});

        yield put(setPaymentRequestFinished());
        return yield put(methodUseSuccess({ amount }));
      }

      if (status === PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.FAILED) {
        call(tracker.track, EVENTS.MIXPANEL_QUICK_DEPOSIT_3DS_STEP_FAILED, {});

        yield put(setPaymentRequestFinished());

        // do a call to getTransactionStatus to get detailed error if possible
        return yield put(methodUseError({ amount, errorKeys: [] }));
      }
    } else {
      // @todo when doing FULL version:
      // handle other cases of redirection, FULL WINDOW etc (KO stack PiqRedirection.js)
    }
  }

  yield put(setPaymentRequestFinished());
  return yield put(methodUseSuccess({ amount }));
}

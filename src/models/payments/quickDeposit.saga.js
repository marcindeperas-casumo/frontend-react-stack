// @flow
import { put, select, call } from "redux-saga/effects";
import { TRANSACTION_ACTION_TYPE, CHANNEL } from "Models/payments";
import { isMobile } from "Components/ResponsiveLayout";
import {
  playerIdSelector,
  piqConfigSelector,
  localeSelector,
} from "Models/handshake";
import { makePIQDepositRequest } from "Api/api.payments";
import {
  setPaymentRequestProcessing,
  setPaymentRequestSuccess,
  setPaymentRequestError,
} from "./payments.actions";
import type { StartQuickDepositActionReturnType } from "./payments.actions";

export function* quickDepositSaga(
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
    "creditcard",
    payload,
    locale
  );

  //@todo: @lukKowalski, add payment tracking
  //@todo: remove sensitive data before that, look for removeSensitiveDataFromPiqErrors in KO code

  if (response.success) {
    if (response.redirectOutput) {
      // do an iframe if required by PIQ (3ds)
      // yield take window.onMessage response when piq redirects after processing payment request
    } else {
      yield put(setPaymentRequestSuccess());
    }
    // track success
  } else {
    // track error
    yield put(setPaymentRequestError(response.statusCode));
  }
}

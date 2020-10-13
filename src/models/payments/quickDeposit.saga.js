// @flow
import { put, select, call } from "redux-saga/effects";
import { TRANSACTION_ACTION_TYPE, CHANNEL } from "Models/payments";
import { isMobile } from "Components/ResponsiveLayout";
import {
  playerIdSelector,
  piqConfigSelector,
  localeSelector,
} from "Models/handshake";
import {
  makePIQDepositRequest,
  getPaymentSessionToken,
} from "Api/api.payments";
import {
  setIsProcessingPaymentUsage,
  setPaymentPiqResult,
} from "./payments.actions";
import type { StartQuickDepositActionReturnType } from "./payments.actions";

export function* quickDepositSaga(
  action: StartQuickDepositActionReturnType
): * {
  const userId = yield select(playerIdSelector);
  const locale = yield select(localeSelector); //check if it's ok to pass full locale or just two letters
  const { merchantId, apiUrl } = yield select(piqConfigSelector);
  const { cvvEncoded, amount, paymentMethod } = action.payload;
  //prepare attributes

  const baseUrl = window.location.origin;
  const redirectUrl = `${baseUrl}/payment/v2`;

  yield put(setIsProcessingPaymentUsage(true));

  //add affiliateId, add gaClientId

  const { id } = yield call(getPaymentSessionToken);

  const payload = {
    accountId: paymentMethod.token,
    encCvv: cvvEncoded,
    amount: amount,
    attributes: {
      successUrl: `${redirectUrl}/finished.html`,
      failureUrl: `${redirectUrl}/failed.html`,
      canceledUrl: `${redirectUrl}/canceled.html`,
      pendingUrl: `${redirectUrl}/pending.html`,
      type: TRANSACTION_ACTION_TYPE.QUICK_DEPOSIT,
      channelId: isMobile ? CHANNEL.MOBILE : CHANNEL.DESKTOP,
    },
    merchantId,
    userId,
    sessionId: id,
  };

  const response = yield call(
    makePIQDepositRequest,
    apiUrl,
    "creditcard",
    payload,
    locale
  );

  //todo: @lukKowalski, add payment tracking
  //remove sensitive data before that, look for removeSensitiveDataFromPiqErrors in KO code

  if (response.success) {
    yield put(setPaymentPiqResult("success"));
    // track success
  } else {
    // track error
    yield put(setPaymentPiqResult("error"));
  }

  //yield take window.onMessage response when piq redirects after processing payment request

  yield put(setIsProcessingPaymentUsage(false));
}

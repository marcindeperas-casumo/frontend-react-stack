// @flow
import { call, put, select, all } from "redux-saga/effects";
import { DateTime } from "luxon";
import { walletIdSelector, walletAmountSelector } from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import {
  getTotalsReq,
  getTransactionsReq,
} from "Api/api.transactionsBetsHistory";
import { annualOverviewSelector } from "./transactionsBetsHistory.selectors";
import { getStartingEndBalanceFromTransactions } from "./transactionsBetsHistory.utils";
import type { FetchAnnualOverviewProps } from "./transactionsBetsHistory.types";

export function* fetchAnnualOverviewSaga(action: FetchAnnualOverviewProps): * {
  const { year, meta = {} } = action;
  const startTime = DateTime.utc(year);
  const endTime = DateTime.utc(year + 1);

  const walletId = yield select(walletIdSelector);
  const annualOverview = yield select(annualOverviewSelector(year));

  if (annualOverview) {
    if (meta.resolve) {
      yield call(meta.resolve);
    }
    return;
  }

  yield put(
    mergeEntity({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: {
          meta: {
            isFetching: true,
            error: null,
          },
        },
      },
    })
  );

  const asyncCallData = { walletId, startTime, endTime };

  try {
    const responses = yield all([
      call(getTotalsReq, asyncCallData),
      call(getTransactionsReq, { ...asyncCallData, perPage: 10000 }),
    ]);

    /* 
     Provide a fallback value for Spain audit for 2019 till new API is not developed
     PCC-140
    */
    const walletAmountFallback =
      year === 2019 ? yield select(walletAmountSelector) : 0;

    yield put(
      mergeEntity({
        [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
          [year]: {
            data: {
              ...responses[0],
              ...getStartingEndBalanceFromTransactions(
                responses[1],
                walletAmountFallback
              ),
            },
            meta: {
              isFetching: false,
            },
          },
        },
      })
    );

    if (meta.resolve) {
      yield call(meta.resolve);
    }
  } catch (e) {
    yield put(
      mergeEntity({
        [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
          [year]: {
            meta: {
              isFetching: false,
              error: String(e),
            },
          },
        },
      })
    );

    if (meta.reject) {
      yield call(meta.reject, e);
    }
  }
}

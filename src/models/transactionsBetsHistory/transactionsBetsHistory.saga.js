// @flow
import { call, put, select, take, all } from "redux-saga/effects";
import { DateTime } from "luxon";
import { walletIdSelector } from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { isFailedFetchTakePatternCreator, getFetch } from "Models/fetch";
import { transactionsBetsHistoryAnnualOverviewSelector } from "./transactionsBetsHistory.selectors";
import {
  fetchWalletTotals,
  fetchWalletTransactions,
} from "./transactionsBetsHistory.actions";
import { getStartingEndBalanceFromTransactions } from "./transactionsBetsHistory.utils";
import { types } from "./transactionsBetsHistory.constants";
import type { FetchAnnualOverviewProps } from "./transactionsBetsHistory.types";

export const isFailedAnnualOverviewRequestTakePattern = isFailedFetchTakePatternCreator(
  types.ANNUAL_OVERVIEW_FETCH_START
);

export function* fetchAnnualOverviewSaga(action: FetchAnnualOverviewProps): * {
  const { year, meta = {} } = action;
  const startTime = DateTime.utc(year);
  const endTime = DateTime.utc(year + 1);

  const walletId = yield select(walletIdSelector);
  const annualOverview = yield select(
    transactionsBetsHistoryAnnualOverviewSelector(year)
  );

  if (annualOverview) {
    if (meta.resolve) {
      yield call(meta.resolve);
    }
    return;
  }

  const asyncCallData = { walletId, startTime, endTime };

  yield all([
    put(fetchWalletTotals(asyncCallData)),
    put(fetchWalletTransactions({ ...asyncCallData, perPage: 10000 })),
  ]);

  /* eslint-disable fp/no-let */
  let walletTotalsFetch;
  let walletTransactionsFetch;
  let isFetching = true;
  /* eslint-enable fp/no-let */

  // eslint-disable-next-line fp/no-loops
  while (isFetching) {
    /* eslint-disable fp/no-mutation */
    walletTotalsFetch = yield select(getFetch(types.WALLET_TOTALS_FETCH_START));
    walletTransactionsFetch = yield select(
      getFetch(types.WALLET_TRANSACTIONS_FETCH_START)
    );

    isFetching =
      walletTotalsFetch?.isFetching || walletTransactionsFetch?.isFetching;
    /* eslint-enable fp/no-mutation */
  }

  if (walletTotalsFetch?.error || walletTransactionsFetch?.error) {
    if (meta.reject) {
      yield call(meta.reject);
    }
    return;
  }

  const walletTotalsEffect = yield take(types.WALLET_TOTALS_FETCH_COMPLETED);
  const walletTransactionsEffect = yield take(
    types.WALLET_TRANSACTIONS_FETCH_COMPLETED
  );

  yield put(
    mergeEntity({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: {
          ...walletTotalsEffect.response,
          ...getStartingEndBalanceFromTransactions(
            walletTransactionsEffect.response
          ),
        },
      },
    })
  );

  if (meta.resolve) {
    yield call(meta.resolve);
  }
}

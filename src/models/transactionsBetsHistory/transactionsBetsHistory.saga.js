// @flow
import { call, put, select, take, race } from "redux-saga/effects";
import { DateTime } from "luxon";
import { walletIdSelector } from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { isFailedFetchTakePatternCreator } from "Models/fetch";
import { transactionsBetsHistoryAnnualOverviewSelector } from "./transactionsBetsHistory.selectors";
import { fetchAnnualOverview } from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";
import type {
  FetchAnnualOverviewProps,
  Action,
} from "./transactionsBetsHistory.types";

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

  yield put(fetchAnnualOverview({ walletId, startTime, endTime }));

  const [fetchCompleted, fetchFailed] = yield race([
    take(types.ANNUAL_OVERVIEW_FETCH_COMPLETED),
    take(isFailedAnnualOverviewRequestTakePattern),
  ]);

  if (fetchFailed) {
    if (meta.reject) {
      yield call(meta.reject);
    }
    return;
  }

  yield put(
    mergeEntity({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: fetchCompleted.response,
      },
    })
  );

  if (meta.resolve) {
    yield call(meta.resolve);
  }
}

// @flow
import { call, put, select, take } from "redux-saga/effects";
import { DateTime } from "luxon";
import { walletIdSelector } from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { fetchAnnualOverview } from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";

type FetchAnnualOverviewSagaProps = {
  year: number,
};

export function* fetchAnnualOverviewSaga(
  action: FetchAnnualOverviewSagaProps
): * {
  const { year } = action;
  const startTime = DateTime.utc(year);
  const endTime = DateTime.utc(year + 1);

  const walletId = yield select(walletIdSelector);

  yield put(fetchAnnualOverview({ walletId, startTime, endTime }));

  const { response } = yield take(types.ANNUAL_OVERVIEW_FETCH_COMPLETED);

  yield put(
    mergeEntity({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: response,
      },
    })
  );
}

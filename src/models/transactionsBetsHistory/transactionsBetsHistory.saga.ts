// @flow
import { call, put, select } from "redux-saga/effects";
import { DateTime } from "luxon";
import { currencySelector } from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { getSummaryReq } from "Api/api.transactionsBetsHistory";
import { annualOverviewSelector } from "./transactionsBetsHistory.selectors";
import type { FetchAnnualOverviewProps } from "./transactionsBetsHistory.types";

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export function* fetchAnnualOverviewSaga(action: FetchAnnualOverviewProps): * {
  const { year, meta = {} } = action;
  const date = DateTime.utc(year);
  const currency = yield select(currencySelector);
  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
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

  const asyncCallData = { date, currency };

  try {
    const response = yield call(getSummaryReq, asyncCallData);

    yield put(
      mergeEntity({
        [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
          [year]: {
            data: {
              ...response,
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

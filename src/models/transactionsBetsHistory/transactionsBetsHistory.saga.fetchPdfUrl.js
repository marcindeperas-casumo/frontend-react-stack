// @flow
import { call, put, select, take, race } from "redux-saga/effects";
import {
  playerNameSelector,
  socialSecurityNumberSelector,
} from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { types as fetchTypes } from "Models/fetch";
import { transactionsBetsHistoryAnnualOverviewSelector } from "./transactionsBetsHistory.selectors";
import { fetchAnnualOverviewPdfUrl } from "./transactionsBetsHistory.actions";
import { prepareFetchAnnualOverviewPdfUrlProps } from "./transactionsBetsHistory.utils";
import { types } from "./transactionsBetsHistory.constants";
import type {
  FetchAnnualOverviewProps,
  Action,
} from "./transactionsBetsHistory.types";

export function* fetchAnnualOverviewPdfUrlSaga(
  action: FetchAnnualOverviewProps
): * {
  const { year, meta = {} } = action;

  const annualOverview = yield select(
    transactionsBetsHistoryAnnualOverviewSelector(year)
  );

  // it's short-circuited because right now this saga can only run when
  // annual overview for a specific year is already fetched.
  if (!annualOverview) {
    if (meta.reject) {
      yield call(meta.reject);
    }
    return;
  }

  const { firstName, lastName } = yield select(playerNameSelector);
  const dni = yield select(socialSecurityNumberSelector);

  yield put(
    fetchAnnualOverviewPdfUrl(
      prepareFetchAnnualOverviewPdfUrlProps({
        annualOverview,
        year,
        name: `${firstName} ${lastName}`,
        dni,
      })
    )
  );

  const [fetchCompleted, fetchFailed] = yield race([
    take(types.ANNUAL_OVERVIEW_FETCH_PDF_URL_COMPLETED),
    take(isFailedPdfUrlRequestTakePattern),
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
        [year]: {
          pdfUrl: fetchCompleted.response.downloadUrl,
        },
      },
    })
  );

  if (meta.resolve) {
    yield call(meta.resolve);
  }
}

export function isFailedPdfUrlRequestTakePattern(action: Action): boolean {
  return (
    action.type === fetchTypes.REQUEST_ERROR &&
    action.name === types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START
  );
}

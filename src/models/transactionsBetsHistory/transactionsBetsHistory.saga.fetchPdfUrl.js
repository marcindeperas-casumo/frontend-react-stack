// @flow
import { call, put, select, take, race } from "redux-saga/effects";
import {
  localeSelector,
  playerNameSelector,
  socialSecurityNumberSelector,
} from "Models/handshake";
import { mergeEntity, ENTITY_KEYS } from "Models/schema";
import { isFailedFetchTakePatternCreator } from "Models/fetch";
import { getAnnualOverviewPdfUrlReq } from "Api/api.transactionsBetsHistory";
import { annualOverviewSelector } from "./transactionsBetsHistory.selectors";
import { prepareFetchAnnualOverviewPdfUrlProps } from "./transactionsBetsHistory.utils";
import { types } from "./transactionsBetsHistory.constants";
import type { FetchAnnualOverviewProps } from "./transactionsBetsHistory.types";

export function* fetchAnnualOverviewPdfUrlSaga(
  action: FetchAnnualOverviewProps
): * {
  const { year, meta = {} } = action;

  const annualOverview = yield select(annualOverviewSelector(year));

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
  const locale = yield select(localeSelector);

  yield put(
    mergeEntity({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: {
          meta: {
            isPdfUrlFetching: true,
            error: null,
          },
        },
      },
    })
  );

  try {
    const response = yield call(
      getAnnualOverviewPdfUrlReq,
      prepareFetchAnnualOverviewPdfUrlProps({
        locale,
        annualOverview,
        year,
        name: `${firstName} ${lastName}`,
        dni,
      })
    );

    yield put(
      mergeEntity({
        [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
          [year]: {
            data: {
              ...annualOverview,
              pdfUrl: response.downloadUrl,
            },
            meta: {
              isPdfUrlFetching: false,
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
              isPdfUrlFetching: false,
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

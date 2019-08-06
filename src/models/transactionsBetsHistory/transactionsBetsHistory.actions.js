// @flow
import { pick } from "ramda";
import { types as fetchTypes } from "Models/fetch";
import {
  getTotalsReq,
  getTransactionsReq,
  getAnnualOverviewPdfUrlReq,
} from "Api/api.transactionsBetsHistory";
import { types } from "./transactionsBetsHistory.constants";
import { getFetchTypeByPeriod } from "./transactionsBetsHistory.utils";
import type {
  WalletTotalsProps,
  WalletTransactionsProps,
  FetchAnnualOverviewProps,
  FetchAnnualOverviewPdfUrlProps,
} from "./transactionsBetsHistory.types";

export function initFetchAnnualOverview({
  year,
  meta = {},
}: FetchAnnualOverviewProps) {
  return {
    year,
    meta,
    type: types.ANNUAL_OVERVIEW_FETCH_INIT,
  };
}

export function fetchWalletTotals(asyncCallData: WalletTotalsProps) {
  return {
    type: fetchTypes.FETCH,
    name: getFetchTypeByPeriod({
      type: types.WALLET_TOTALS_FETCH_START,
      ...pick(["startTime", "endTime"], asyncCallData),
    }),
    asyncCallData,
    asyncCall: getTotalsReq,
    postFetch: types.WALLET_TOTALS_FETCH_COMPLETED,
  };
}

export function fetchWalletTransactions(
  asyncCallData: WalletTransactionsProps
) {
  return {
    type: fetchTypes.FETCH,
    name: getFetchTypeByPeriod({
      type: types.WALLET_TRANSACTIONS_FETCH_START,
      ...pick(["startTime", "endTime"], asyncCallData),
    }),
    asyncCallData,
    asyncCall: getTransactionsReq,
    postFetch: types.WALLET_TRANSACTIONS_FETCH_COMPLETED,
  };
}

export function initFetchAnnualOverviewPdfUrl({
  year,
  meta = {},
}: FetchAnnualOverviewProps) {
  return {
    year,
    meta,
    type: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_INIT,
  };
}

export function fetchAnnualOverviewPdfUrl(
  asyncCallData: FetchAnnualOverviewPdfUrlProps
) {
  return {
    type: fetchTypes.FETCH,
    name: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START,
    asyncCallData,
    asyncCall: getAnnualOverviewPdfUrlReq,
    postFetch: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_COMPLETED,
  };
}

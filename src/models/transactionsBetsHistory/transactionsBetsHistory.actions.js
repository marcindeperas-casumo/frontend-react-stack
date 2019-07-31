// @flow
import { types as fetchTypes } from "Models/fetch";
import {
  getOverviewReq,
  getAnnualOverviewPdfUrlReq,
} from "Api/api.transactionsBetsHistory";
import { types } from "./transactionsBetsHistory.constants";
import type {
  WalletTotalsProps,
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

export function fetchAnnualOverview(asyncCallData: WalletTotalsProps) {
  return {
    type: fetchTypes.FETCH,
    name: types.ANNUAL_OVERVIEW_FETCH_START,
    asyncCallData,
    asyncCall: getOverviewReq,
    postFetch: types.ANNUAL_OVERVIEW_FETCH_COMPLETED,
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

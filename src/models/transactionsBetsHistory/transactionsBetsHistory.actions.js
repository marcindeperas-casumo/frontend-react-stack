// @flow
import { types as fetchTypes } from "Models/fetch";
import { getTotalsReq } from "Api/api.transactionsBetsHistory";
import { playerIdSelector } from "Models/handshake";
import { types } from "./transactionsBetsHistory.constants";
import type { WalletTotalsProps } from "./transactionsBetsHistory.types";

export function initFetchAnnualOverview(year: number) {
  return { year, type: types.ANNUAL_OVERVIEW_FETCH_INIT };
}

export function fetchAnnualOverview(asyncCallData: WalletTotalsProps) {
  return {
    type: fetchTypes.FETCH,
    name: types.ANNUAL_OVERVIEW_FETCH_START,
    asyncCallData,
    asyncCall: getTotalsReq,
    postFetch: types.ANNUAL_OVERVIEW_FETCH_COMPLETED,
  };
}

// @flow
import { types } from "./transactionsBetsHistory.constants";
import type { FetchAnnualOverviewProps } from "./transactionsBetsHistory.types";

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

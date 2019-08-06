// @flow
import { DateTime } from "luxon";
import { types as fetchTypes } from "Models/fetch";
import {
  getTotalsReq,
  getAnnualOverviewPdfUrlReq,
  getTransactionsReq,
} from "Api/api.transactionsBetsHistory";
import {
  initFetchAnnualOverview,
  fetchWalletTotals,
  fetchWalletTransactions,
  initFetchAnnualOverviewPdfUrl,
  fetchAnnualOverviewPdfUrl,
} from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";
import {
  prepareFetchAnnualOverviewPdfUrlProps,
  getFetchTypeByPeriod,
} from "./transactionsBetsHistory.utils";
import annualOverview from "./__mocks__/annualOverview.mock";

jest.mock("Api/api.transactionsBetsHistory");

describe("Models/transactionsBetsHistory/Actions", () => {
  const year = 2010;

  test("initFetchAnnualOverview()", () => {
    const action = initFetchAnnualOverview({ year });

    expect(action).toEqual({
      year,
      meta: {},
      type: types.ANNUAL_OVERVIEW_FETCH_INIT,
    });
  });

  test("fetchWalletTotals()", () => {
    const startTime = DateTime.utc(year);
    const endTime = DateTime.utc(year + 1);
    const asyncCallData = { walletId: "wallet-23", startTime, endTime };
    const action = fetchWalletTotals(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: getFetchTypeByPeriod({
        type: types.WALLET_TOTALS_FETCH_START,
        startTime,
        endTime,
      }),
      asyncCallData,
      asyncCall: getTotalsReq,
      postFetch: types.WALLET_TOTALS_FETCH_COMPLETED,
    });
  });

  test("fetchWalletTransactions()", () => {
    const startTime = DateTime.utc(year);
    const endTime = DateTime.utc(year + 1);
    const asyncCallData = {
      walletId: "wallet-23",
      startTime,
      endTime,
      perPage: 10,
    };
    const action = fetchWalletTransactions(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: getFetchTypeByPeriod({
        type: types.WALLET_TRANSACTIONS_FETCH_START,
        startTime,
        endTime,
      }),
      asyncCallData,
      asyncCall: getTransactionsReq,
      postFetch: types.WALLET_TRANSACTIONS_FETCH_COMPLETED,
    });
  });

  test("initFetchAnnualOverviewPdfUrl()", () => {
    const action = initFetchAnnualOverviewPdfUrl({ year });

    expect(action).toEqual({
      year,
      meta: {},
      type: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_INIT,
    });
  });

  test("fetchAnnualOverviewPdfUrl()", () => {
    const asyncCallData = prepareFetchAnnualOverviewPdfUrlProps({
      annualOverview,
      year,
      name: "SOME NAME",
      dni: "SOME DNI",
      locale: "en-GB",
    });
    const action = fetchAnnualOverviewPdfUrl(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START,
      asyncCallData,
      asyncCall: getAnnualOverviewPdfUrlReq,
      postFetch: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_COMPLETED,
    });
  });
});

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
  initFetchAnnualOverviewPdfUrl,
} from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";
import { prepareFetchAnnualOverviewPdfUrlProps } from "./transactionsBetsHistory.utils";
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

  test("initFetchAnnualOverviewPdfUrl()", () => {
    const action = initFetchAnnualOverviewPdfUrl({ year });

    expect(action).toEqual({
      year,
      meta: {},
      type: types.ANNUAL_OVERVIEW_FETCH_PDF_URL_INIT,
    });
  });
});

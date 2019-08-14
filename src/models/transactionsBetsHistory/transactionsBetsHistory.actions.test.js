// @flow
import {
  initFetchAnnualOverview,
  initFetchAnnualOverviewPdfUrl,
} from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";

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

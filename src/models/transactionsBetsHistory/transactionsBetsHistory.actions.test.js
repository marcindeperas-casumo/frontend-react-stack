// @flow
import { DateTime } from "luxon";
import { types as fetchTypes } from "Models/fetch";
import { getTotalsReq } from "Api/api.transactionsBetsHistory";
import {
  initFetchAnnualOverview,
  fetchAnnualOverview,
} from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";

jest.mock("Api/api.transactionsBetsHistory");

describe("Models/transactionsBetsHistory/Actions", () => {
  test("initFetchAnnualOverview()", () => {
    const year = 2010;
    const action = initFetchAnnualOverview({ year });

    expect(action).toEqual({
      year,
      meta: {},
      type: types.ANNUAL_OVERVIEW_FETCH_INIT,
    });
  });

  test("fetchAnnualOverview()", () => {
    const year = 2010;
    const startTime = DateTime.utc(year);
    const endTime = DateTime.utc(year + 1);
    const asyncCallData = { walletId: "wallet-23", startTime, endTime };
    const action = fetchAnnualOverview(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: types.ANNUAL_OVERVIEW_FETCH_START,
      asyncCallData,
      asyncCall: getTotalsReq,
      postFetch: types.ANNUAL_OVERVIEW_FETCH_COMPLETED,
    });
  });
});

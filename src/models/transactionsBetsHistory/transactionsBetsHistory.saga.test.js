import { put, call, select } from "redux-saga/effects";
import { DateTime } from "luxon";
import { ENTITY_KEYS } from "Models/schema";
import * as actions from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";
import { fetchAnnualOverviewSaga } from "./transactionsBetsHistory.saga";

describe("fetchAnnualOverviewSaga()", () => {
  test("success flow", () => {
    const walletId = "wallet-id-34";
    const annualOverview = {
      betsAmount: 23.4,
      bonusesAmount: 34.4,
    };
    const action = {
      year: 2018,
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    const fetchTotalsAction = generator.next(walletId).value.PUT.action;

    expect(fetchTotalsAction.name).toEqual(types.ANNUAL_OVERVIEW_FETCH_START);
    expect(fetchTotalsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
    });

    const takeEffect = generator.next().value;

    expect(takeEffect.TAKE.pattern).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_COMPLETED
    );

    const mergeEntityEffect = generator.next(annualOverview).value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_BETS_HISTORY_ANNUAL_OVERVIEW]: {
        [action.year]: annualOverview,
      },
    });
  });
});

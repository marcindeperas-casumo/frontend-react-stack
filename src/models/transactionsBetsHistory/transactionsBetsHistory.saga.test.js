import { put, call, select } from "redux-saga/effects";
import { DateTime } from "luxon";
import { ENTITY_KEYS } from "Models/schema";
import * as actions from "./transactionsBetsHistory.actions";
import { types } from "./transactionsBetsHistory.constants";
import {
  fetchAnnualOverviewSaga,
  isFailedRequestTakePattern,
} from "./transactionsBetsHistory.saga";

describe("fetchAnnualOverviewSaga()", () => {
  test("success flow", () => {
    const walletId = "wallet-id-34";
    const annualOverview = {
      betsAmount: 23.4,
      awardedBonusesAmount: 34.4,
      convertedBonusesAmount: 10,
      currency: "GBP",
      winningsAmount: 11,
      depositsAmount: 13.4,
      withdrawalsAmount: 76,
    };
    const action = {
      year: 2018,
      meta: {
        resolve: jest.fn(),
      },
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    generator.next(walletId);

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchTotalsAction = generator.next(null).value.PUT.action;

    expect(fetchTotalsAction.name).toEqual(types.ANNUAL_OVERVIEW_FETCH_START);
    expect(fetchTotalsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
    });

    // a RACE effect takes place - either a fetch succeeds or an error is found
    const raceEffect = generator.next().value;

    expect(raceEffect.RACE[0].TAKE.pattern).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_COMPLETED
    );
    expect(raceEffect.RACE[1].TAKE.pattern).toEqual(isFailedRequestTakePattern);

    const mergeEntityEffect = generator.next([
      { response: annualOverview },
      null,
    ]).value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: annualOverview,
      },
    });

    const resolveCallEffects = generator.next().value;

    expect(resolveCallEffects.CALL.fn).toEqual(action.meta.resolve);

    expect(generator.next().done).toEqual(true);
  });

  test("fail flow", () => {
    const walletId = "wallet-id-34";
    const action = {
      year: 2010,
      meta: {
        reject: jest.fn(),
      },
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    generator.next(walletId);

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchTotalsAction = generator.next(null).value.PUT.action;

    expect(fetchTotalsAction.name).toEqual(types.ANNUAL_OVERVIEW_FETCH_START);
    expect(fetchTotalsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
    });

    // a RACE effect takes place - either a fetch succeeds or an error is found
    const raceEffect = generator.next().value;

    expect(raceEffect.RACE[0].TAKE.pattern).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_COMPLETED
    );
    expect(raceEffect.RACE[1].TAKE.pattern).toEqual(isFailedRequestTakePattern);

    const rejectCallEffects = generator.next([
      null,
      { error: "error happened" },
    ]).value;

    expect(rejectCallEffects.CALL.fn).toEqual(action.meta.reject);

    expect(generator.next().done).toEqual(true);
  });
});

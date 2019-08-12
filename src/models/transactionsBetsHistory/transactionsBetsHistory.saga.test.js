import { DateTime } from "luxon";
import { ENTITY_KEYS } from "Models/schema";
import {
  totalsResponse,
  transactions,
} from "Api/__mocks__/api.transactionsBetsHistory.mock";
import {
  getTotalsReq,
  getTransactionsReq,
} from "Api/api.transactionsBetsHistory";
import { types } from "./transactionsBetsHistory.constants";
import { fetchAnnualOverviewSaga } from "./transactionsBetsHistory.saga";

describe("fetchAnnualOverviewSaga()", () => {
  test("success flow", () => {
    const walletId = "wallet-id-34";
    const action = {
      year: 2018,
      meta: {
        resolve: jest.fn(),
      },
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    generator.next(walletId);

    const isFetchingEffect = generator.next(null).value;

    expect(isFetchingEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isFetching: true,
            error: null,
          },
        },
      },
    });

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchAllEffect = generator.next(null).value;
    const fetchTotalsEffect = fetchAllEffect.ALL[0].CALL;
    const fetchTransactionsEffect = fetchAllEffect.ALL[1].CALL;
    const startTime = DateTime.utc(action.year);
    const endTime = DateTime.utc(action.year + 1);

    expect(fetchTotalsEffect.fn).toEqual(getTotalsReq);
    expect(fetchTotalsEffect.args[0]).toEqual({ startTime, endTime, walletId });

    expect(fetchTransactionsEffect.fn).toEqual(getTransactionsReq);
    expect(fetchTransactionsEffect.args[0]).toEqual({
      walletId,
      startTime,
      endTime,
      perPage: 10000,
    });

    const mergeEntityEffect = generator.next([totalsResponse, transactions])
      .value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          data: {
            ...totalsResponse,
            startingBalanceAmount: 249.2855,
            endBalanceAmount: 289.2855,
          },
          meta: {
            isFetching: false,
          },
        },
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

    const isFetchingEffect = generator.next(null).value;

    expect(isFetchingEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isFetching: true,
            error: null,
          },
        },
      },
    });

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchAllEffect = generator.next(null).value;
    const fetchTotalsEffect = fetchAllEffect.ALL[0].CALL;
    const fetchTransactionsEffect = fetchAllEffect.ALL[1].CALL;
    const startTime = DateTime.utc(action.year);
    const endTime = DateTime.utc(action.year + 1);

    expect(fetchTotalsEffect.fn).toEqual(getTotalsReq);
    expect(fetchTotalsEffect.args[0]).toEqual({ startTime, endTime, walletId });

    expect(fetchTransactionsEffect.fn).toEqual(getTransactionsReq);
    expect(fetchTransactionsEffect.args[0]).toEqual({
      walletId,
      startTime,
      endTime,
      perPage: 10000,
    });

    const errorMsg = "smthg happened";
    const errorEffect = generator.throw(new Error(errorMsg)).value;

    expect(errorEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isFetching: false,
            error: `Error: ${errorMsg}`,
          },
        },
      },
    });

    const rejectCallEffects = generator.next().value;

    expect(rejectCallEffects.CALL.fn).toEqual(action.meta.reject);

    expect(generator.next().done).toEqual(true);
  });
});

import { DateTime } from "luxon";
import { ENTITY_KEYS } from "Models/schema";
import {
  totalsResponse,
  transactions,
} from "Api/__mocks__/api.transactionsBetsHistory.mock";
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

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchAllEffect = generator.next(null).value;
    const fetchTotalsAction = fetchAllEffect.ALL[0].PUT.action;
    const fetchTransactionsAction = fetchAllEffect.ALL[1].PUT.action;

    expect(fetchTotalsAction.name).toEqual(types.WALLET_TOTALS_FETCH_START);
    expect(fetchTotalsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
    });

    expect(fetchTransactionsAction.name).toEqual(
      types.WALLET_TRANSACTIONS_FETCH_START
    );
    expect(fetchTransactionsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
      perPage: 10000,
    });

    generator.next();

    const fetchStateObject = { isFetching: false, error: null };
    // feed select for totals fetch state
    generator.next(fetchStateObject);
    // feed select for transactions fetch state
    const walletTotalsTakeEffect = generator.next().value;

    expect(walletTotalsTakeEffect.TAKE.pattern).toEqual(
      types.WALLET_TOTALS_FETCH_COMPLETED
    );

    const walletTransactionsTakeEffect = generator.next({
      response: totalsResponse,
    }).value;

    expect(walletTransactionsTakeEffect.TAKE.pattern).toEqual(
      types.WALLET_TRANSACTIONS_FETCH_COMPLETED
    );

    const mergeEntityEffect = generator.next({ response: transactions }).value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          ...totalsResponse,
          startingBalanceAmount: 249.2855,
          endBalanceAmount: 289.2855,
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

    // because state does not contain annualOverview (null) for the selected year
    // a fetch must happen
    const fetchAllEffect = generator.next(null).value;

    const fetchTotalsAction = fetchAllEffect.ALL[0].PUT.action;
    const fetchTransactionsAction = fetchAllEffect.ALL[1].PUT.action;

    expect(fetchTotalsAction.name).toEqual(types.WALLET_TOTALS_FETCH_START);
    expect(fetchTotalsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
    });

    expect(fetchTransactionsAction.name).toEqual(
      types.WALLET_TRANSACTIONS_FETCH_START
    );
    expect(fetchTransactionsAction.asyncCallData).toEqual({
      walletId,
      startTime: DateTime.utc(action.year),
      endTime: DateTime.utc(action.year + 1),
      perPage: 10000,
    });

    // feed select for totals fetch state
    generator.next({ isFetching: false, error: null });

    const fetchTransactionsStateObject = {
      isFetching: false,
      error: new Error("error happened"),
    };
    // feed select for transactions fetch state
    generator.next(fetchTransactionsStateObject);

    const rejectCallEffects = generator.next().value;

    expect(rejectCallEffects.CALL.fn).toEqual(action.meta.reject);

    expect(generator.next().done).toEqual(true);
  });
});

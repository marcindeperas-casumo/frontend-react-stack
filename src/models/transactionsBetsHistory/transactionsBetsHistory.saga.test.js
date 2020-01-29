import { DateTime } from "luxon";
import { ENTITY_KEYS } from "Models/schema";
import { getSummaryReq } from "Api/api.transactionsBetsHistory";
import annualOverviewMock from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { fetchAnnualOverviewSaga } from "./transactionsBetsHistory.saga";

describe("fetchAnnualOverviewSaga()", () => {
  test("success flow", () => {
    const currency = "EUR";
    const action = {
      year: 2018,
      meta: {
        resolve: jest.fn(),
      },
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    generator.next(currency);

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
    const fetchSummaryEffect = generator.next(null).value;
    const date = DateTime.utc(action.year);

    expect(fetchSummaryEffect.CALL.fn).toEqual(getSummaryReq);
    expect(fetchSummaryEffect.CALL.args[0]).toEqual({ date, currency });

    const mergeEntityEffect = generator.next(annualOverviewMock).value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          data: {
            ...annualOverviewMock,
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
    const currency = "GBP";
    const action = {
      year: 2010,
      meta: {
        reject: jest.fn(),
      },
    };
    const generator = fetchAnnualOverviewSaga(action);

    generator.next();

    generator.next(currency);

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
    const fetchSummaryEffect = generator.next(null).value;
    const date = DateTime.utc(action.year);

    expect(fetchSummaryEffect.CALL.fn).toEqual(getSummaryReq);
    expect(fetchSummaryEffect.CALL.args[0]).toEqual({ date, currency });

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

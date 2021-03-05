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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'PUT' does not exist on type 'void | Sele... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
    expect(fetchSummaryEffect.CALL.fn).toEqual(getSummaryReq);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
    expect(fetchSummaryEffect.CALL.args[0]).toEqual({ date, currency });

    const mergeEntityEffect = generator.next(annualOverviewMock).value;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'PUT' does not exist on type 'void | Sele... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'PUT' does not exist on type 'void | Sele... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
    expect(fetchSummaryEffect.CALL.fn).toEqual(getSummaryReq);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
    expect(fetchSummaryEffect.CALL.args[0]).toEqual({ date, currency });

    const errorMsg = "smthg happened";
    const errorEffect = generator.throw(new Error(errorMsg)).value;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'PUT' does not exist on type 'void | Sele... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'CALL' does not exist on type 'void | Sel... Remove this comment to see the full error message
    expect(rejectCallEffects.CALL.fn).toEqual(action.meta.reject);

    expect(generator.next().done).toEqual(true);
  });
});

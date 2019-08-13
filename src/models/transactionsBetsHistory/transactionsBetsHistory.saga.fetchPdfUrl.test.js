import { path } from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import { getAnnualOverviewPdfUrlReq } from "Api/api.transactionsBetsHistory";
import { fetchAnnualOverviewPdfUrlSaga } from "./transactionsBetsHistory.saga.fetchPdfUrl";
import { prepareFetchAnnualOverviewPdfUrlProps } from "./transactionsBetsHistory.utils";
import annualOverview from "./__mocks__/annualOverview.mock";

describe("fetchAnnualOverviewPdfUrlSaga()", () => {
  const year = 2001;
  const action = {
    year,
  };
  const firstName = "GI";
  const lastName = "Joe";
  const playerName = {
    firstName,
    lastName,
  };
  const dni = "111-222-333-444";
  const locale = "en";

  test("no annual overview for selected year flow", () => {
    const generator = fetchAnnualOverviewPdfUrlSaga(action);

    generator.next();

    // there is no annual overview
    generator.next();

    expect(generator.next().done).toEqual(true);
  });

  test("annual overview for selected year exists, proceed to fetch", () => {
    const pdfUrlResponse = {
      downloadUrl: "pdf-url-response",
    };
    const generator = fetchAnnualOverviewPdfUrlSaga(action);

    generator.next();

    // there is annual overview
    generator.next(annualOverview);

    generator.next(playerName);

    generator.next(dni);

    const isFetchingEffect = generator.next(locale).value;

    expect(isFetchingEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isPdfUrlFetching: true,
            error: null,
          },
        },
      },
    });

    const fetchPdfUrlEffect = generator.next().value;

    expect(path(["CALL", "fn"], fetchPdfUrlEffect)).toEqual(
      getAnnualOverviewPdfUrlReq
    );

    expect(path(["CALL", "args", 0], fetchPdfUrlEffect)).toEqual(
      prepareFetchAnnualOverviewPdfUrlProps({
        annualOverview,
        locale,
        year,
        name: `${firstName} ${lastName}`,
        dni,
      })
    );

    // push for success flow
    const mergeEntityEffect = generator.next(pdfUrlResponse).value;

    expect(path(["PUT", "action", "payload"], mergeEntityEffect)).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: {
          data: {
            ...annualOverview,
            pdfUrl: pdfUrlResponse.downloadUrl,
          },
          meta: {
            isPdfUrlFetching: false,
          },
        },
      },
    });

    expect(generator.next().done).toEqual(true);
  });

  test("annual overview for selected year exists but request fails", () => {
    const reject = jest.fn();
    const modifiedAction = {
      year,
      meta: {
        reject,
      },
    };
    const generator = fetchAnnualOverviewPdfUrlSaga(modifiedAction);

    generator.next();

    // there is annual overview
    generator.next(annualOverview);

    generator.next(playerName);

    generator.next(dni);

    const isFetchingEffect = generator.next(locale).value;

    expect(isFetchingEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isPdfUrlFetching: true,
            error: null,
          },
        },
      },
    });

    const fetchPdfUrlEffect = generator.next().value;

    expect(path(["CALL", "fn"], fetchPdfUrlEffect)).toEqual(
      getAnnualOverviewPdfUrlReq
    );

    // push for failure flow
    const errorMsg = "BAD";
    const errorEffect = generator.throw(new Error(errorMsg)).value;

    expect(errorEffect.PUT.action.payload).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [action.year]: {
          meta: {
            isPdfUrlFetching: false,
            error: `Error: ${errorMsg}`,
          },
        },
      },
    });

    const rejectCallEffects = generator.next().value;

    expect(path(["CALL", "fn"], rejectCallEffects)).toEqual(reject);

    expect(generator.next().done).toEqual(true);
  });
});

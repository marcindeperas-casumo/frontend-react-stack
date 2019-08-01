import { DateTime } from "luxon";
import { path } from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import { types } from "./transactionsBetsHistory.constants";
import {
  fetchAnnualOverviewPdfUrlSaga,
  isFailedPdfUrlRequestTakePattern,
} from "./transactionsBetsHistory.saga.fetchPdfUrl";
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

    const fetchPdfUrlEffect = generator.next(locale).value;

    expect(path(["PUT", "action", "name"], fetchPdfUrlEffect)).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START
    );

    expect(path(["PUT", "action", "asyncCallData"], fetchPdfUrlEffect)).toEqual(
      prepareFetchAnnualOverviewPdfUrlProps({
        annualOverview,
        locale,
        year,
        name: `${firstName} ${lastName}`,
        dni,
      })
    );

    const fetchFailRaceEffect = generator.next().value;

    expect(path(["RACE", 0, "TAKE", "pattern"], fetchFailRaceEffect)).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_COMPLETED
    );

    expect(path(["RACE", 1, "TAKE", "pattern"], fetchFailRaceEffect)).toEqual(
      isFailedPdfUrlRequestTakePattern
    );

    // push for success flow
    const mergeEntityEffect = generator.next([
      { response: pdfUrlResponse },
      null,
    ]).value;

    expect(path(["PUT", "action", "payload"], mergeEntityEffect)).toEqual({
      [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: {
        [year]: {
          pdfUrl: pdfUrlResponse.downloadUrl,
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

    const fetchPdfUrlEffect = generator.next(locale).value;

    expect(path(["PUT", "action", "name"], fetchPdfUrlEffect)).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START
    );

    // race effect
    generator.next();

    // push for failure flow
    const rejectCallEffects = generator.next([
      null,
      { error: "something wrong" },
    ]).value;

    expect(path(["CALL", "fn"], rejectCallEffects)).toEqual(reject);

    expect(generator.next().done).toEqual(true);
  });
});

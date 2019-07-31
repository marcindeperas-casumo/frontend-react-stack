import { DateTime } from "luxon";
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
    generator.next(null);

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

    expect(fetchPdfUrlEffect.PUT.action.name).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START
    );

    expect(fetchPdfUrlEffect.PUT.action.asyncCallData).toEqual(
      prepareFetchAnnualOverviewPdfUrlProps({
        annualOverview,
        locale,
        year,
        name: `${firstName} ${lastName}`,
        dni,
      })
    );

    const fetchFailRaceEffect = generator.next().value;

    expect(fetchFailRaceEffect.RACE[0].TAKE.pattern).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_COMPLETED
    );

    expect(fetchFailRaceEffect.RACE[1].TAKE.pattern).toEqual(
      isFailedPdfUrlRequestTakePattern
    );

    // push for success flow
    const mergeEntityEffect = generator.next([
      { response: pdfUrlResponse },
      null,
    ]).value;

    expect(mergeEntityEffect.PUT.action.payload).toEqual({
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

    expect(fetchPdfUrlEffect.PUT.action.name).toEqual(
      types.ANNUAL_OVERVIEW_FETCH_PDF_URL_START
    );

    // race effect
    generator.next();

    // push for failure flow
    const rejectCallEffects = generator.next([
      null,
      { error: "something wrong" },
    ]).value;

    expect(rejectCallEffects.CALL.fn).toEqual(reject);

    expect(generator.next().done).toEqual(true);
  });
});

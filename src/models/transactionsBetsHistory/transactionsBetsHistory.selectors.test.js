import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import {
  transactionsBetsHistoryContentSelector,
  annualOverviewSelector,
  transactionsAnnualOverviewPdfUrlSelector,
  isAnnualOverviewFetchingSelector,
} from "./transactionsBetsHistory.selectors";
import annualOverview from "./__mocks__/annualOverview.mock";

describe("Transactions/Bets History Selectors", () => {
  describe("annualOverviewSelector()", () => {
    const state = {
      schema: {
        transactionsBetsHistoryAnnualOverview: {
          2019: {
            data: annualOverview,
          },
        },
      },
    };

    test("returns year overview if it exists", () => {
      expect(annualOverviewSelector(2019)(state)).toEqual(annualOverview);
    });

    test("returns null if overview for a year does not exist", () => {
      expect(annualOverviewSelector(2010)(state)).toEqual(null);
    });
  });

  describe("transactionsBetsHistoryContentSelector()", () => {
    const pageObject = {
      slug: CMS_CONTENT_SLUG,
      fields: {
        text_fields: [
          {
            key: "label_1",
            value: "value_1",
          },
        ],
      },
    };
    const state = { schema: { cms: { [pageObject.slug]: pageObject } } };

    test("returns content properly formatted if it exists", () => {
      expect(transactionsBetsHistoryContentSelector(state)).toEqual({
        label_1: "value_1",
      });
    });
  });

  describe("transactionsAnnualOverviewPdfUrlSelector()", () => {
    const year = 2019;
    const pdfUrl = "PDF_URL";
    const overview2019 = {
      betsAmount: 123.4,
      winningsAmount: 67.8,
      withdrawalsAmount: 11.3,
      bonusesAmount: 33.2,
      depositsAmount: 19.6,
      pdfUrl,
    };
    const state = {
      schema: {
        transactionsBetsHistoryAnnualOverview: {
          [year]: {
            data: overview2019,
          },
        },
      },
    };

    test("returns pdf url when it exists", () => {
      expect(transactionsAnnualOverviewPdfUrlSelector(year)(state)).toEqual(
        pdfUrl
      );
    });
  });

  describe("isAnnualOverviewFetchingSelector()", () => {
    test("returns true if isFetching flag is true", () => {
      const year = 2011;
      const state = {
        schema: {
          transactionsBetsHistoryAnnualOverview: {
            [year]: {
              meta: {
                isFetching: true,
              },
            },
          },
        },
      };

      expect(isAnnualOverviewFetchingSelector(year)(state)).toEqual(true);
    });
  });
});

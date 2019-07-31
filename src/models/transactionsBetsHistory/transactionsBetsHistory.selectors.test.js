import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import {
  transactionsBetsHistoryContentSelector,
  transactionsBetsHistoryAnnualOverviewSelector,
} from "./transactionsBetsHistory.selectors";
import annualOverview from "./__mocks__/annualOverview.mock";

describe("Transactions/Bets History Selectors", () => {
  describe("transactionsBetsHistoryAnnualOverviewSelector()", () => {
    const state = {
      schema: {
        transactionsBetsHistoryAnnualOverview: {
          2019: annualOverview,
        },
      },
    };

    test("returns year overview if it exists", () => {
      expect(
        transactionsBetsHistoryAnnualOverviewSelector(2019)(state)
      ).toEqual(annualOverview);
    });

    test("returns null if overview for a year does not exist", () => {
      expect(
        transactionsBetsHistoryAnnualOverviewSelector(2010)(state)
      ).toEqual(null);
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
});

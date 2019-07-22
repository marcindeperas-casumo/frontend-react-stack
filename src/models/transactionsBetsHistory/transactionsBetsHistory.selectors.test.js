import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import {
  transactionsBetsHistoryContentSelector,
  transactionsBetsHistoryAnnualOverviewSelector,
} from "./transactionsBetsHistory.selectors";

describe("Transactions/Bets History Selectors", () => {
  describe("transactionsBetsHistoryAnnualOverviewSelector()", () => {
    const overview2019 = {
      betsAmount: 123.4,
      winningsAmount: 67.8,
      withdrawalsAmount: 11.3,
      bonusesAmount: 33.2,
      depositsAmount: 19.6,
    };
    const state = {
      schema: {
        transactionsBetsHistoryAnnualOverview: {
          2019: overview2019,
        },
      },
    };

    test("returns year overview if it exists", () => {
      expect(
        transactionsBetsHistoryAnnualOverviewSelector(2019)(state)
      ).toEqual(overview2019);
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

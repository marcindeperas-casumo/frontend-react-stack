import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import { transactionsBetsHistoryContentSelector } from "./transactionsBetsHistory.selectors";

describe("Transactions & Bets History Selectors", () => {
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

  describe("transactionsBetsHistoryContentSelector()", () => {
    test("returns content properly formatted if it exists", () => {
      expect(transactionsBetsHistoryContentSelector(state)).toEqual({
        label_1: "value_1",
      });
    });
  });
});

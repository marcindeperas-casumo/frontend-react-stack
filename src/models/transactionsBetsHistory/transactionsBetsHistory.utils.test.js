// @flow
import { transactions } from "Api/__mocks__/api.transactionsBetsHistory.mock";
import { getStartingEndBalanceFromTransactions } from "./transactionsBetsHistory.utils";

describe("transactionsBetsHistory.utils", () => {
  describe("getStartingEndBalanceFromTransactions()", () => {
    test("should return an object with startingBalanceAmount and endBalanceAmount calculated from input", () => {
      const balances = getStartingEndBalanceFromTransactions(transactions);

      expect(balances).toEqual({
        startingBalanceAmount: 249.2855,
        endBalanceAmount: 289.2855,
      });
    });

    test("should return balance amounts equal to fallback value if there are no transactions", () => {
      const balances = getStartingEndBalanceFromTransactions([], 33);

      expect(balances).toEqual({
        startingBalanceAmount: 33,
        endBalanceAmount: 33,
      });
    });
  });
});

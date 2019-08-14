// @flow
import annualOverview from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { transactions } from "Api/__mocks__/api.transactionsBetsHistory.mock";
import {
  prepareFetchAnnualOverviewPdfUrlProps,
  getStartingEndBalanceFromTransactions,
} from "./transactionsBetsHistory.utils";

describe("transactionsBetsHistory.utils", () => {
  describe("prepareFetchAnnualOverviewPdfUrlProps()", () => {
    const locale = "en-GB";
    const year = 2008;
    const name = "Maximus";
    const dni = "1234-3464-8677";

    test("should return data in format accepted by annual-overview-print service", () => {
      const result = prepareFetchAnnualOverviewPdfUrlProps({
        annualOverview,
        locale,
        year,
        name,
        dni,
      });

      expect(result).toEqual({
        year,
        name,
        dni,
        startingBalance: "£1,000",
        endingBalance: "£1,111",
        totalDeposits: "£72",
        totalWithdrawals: "£39",
        totalWagers: "£66",
        totalWins: "£98.80",
        totalBonusesConverted: "£45",
      });
    });
  });

  describe("getStartingEndBalanceFromTransactions()", () => {
    test("should an object with startingBalanceAmount and endBalanceAmount calculated from input", () => {
      const balances = getStartingEndBalanceFromTransactions(transactions);

      expect(balances).toEqual({
        startingBalanceAmount: 249.2855,
        endBalanceAmount: 289.2855,
      });
    });
  });
});

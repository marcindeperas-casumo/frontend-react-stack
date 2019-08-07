// @flow
import { DateTime } from "luxon";
import annualOverview from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { transactions } from "Api/__mocks__/api.transactionsBetsHistory.mock";
import { types } from "./transactionsBetsHistory.constants";
import {
  prepareFetchAnnualOverviewPdfUrlProps,
  getStartingEndBalanceFromTransactions,
  getUniqueFetchName,
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

  describe("getUniqueFetchName()", () => {
    test("should return a properly formatted string", () => {
      const type = types.ANNUAL_OVERVIEW_FETCH_INIT;
      const startTime = DateTime.utc(2001, 2, 11);
      const endTime = DateTime.utc(2001, 6, 1);

      expect(getUniqueFetchName({ type, startTime, endTime })).toEqual(
        `${type}--${startTime.toISO()}--${endTime.toISO()}`
      );
    });
  });
});

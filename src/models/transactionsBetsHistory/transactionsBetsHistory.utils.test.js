import annualOverview from "Models/transactionsBetsHistory/__mocks__/annualOverview.json";
import { types } from "./transactionsBetsHistory.constants";
import {
  prepareFetchAnnualOverviewPdfUrlProps,
  getFetchTypeByYear,
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
        startingBalance: "£0",
        endingBalance: "£0",
        totalDeposits: "£12.40",
        totalWithdrawals: "£55.50",
        totalWagers: "£0",
        totalWins: "£34.50",
        totalBonusesConverted: "£2",
      });
    });
  });

  describe("getFetchTypeByYear()", () => {
    test("should return a properly formatted string", () => {
      const type = types.ANNUAL_OVERVIEW_FETCH_INIT;
      const year = 2010;

      expect(getFetchTypeByYear(type, year)).toEqual(`${type}-${year}`);
    });
  });
});

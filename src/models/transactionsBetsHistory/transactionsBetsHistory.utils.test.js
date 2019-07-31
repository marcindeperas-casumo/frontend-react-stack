import annualOverview from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { prepareFetchAnnualOverviewPdfUrlProps } from "./transactionsBetsHistory.utils";

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
        totalWagers: "£0",
        totalWins: "£98.80",
        totalBonusesConverted: "£45",
      });
    });
  });
});

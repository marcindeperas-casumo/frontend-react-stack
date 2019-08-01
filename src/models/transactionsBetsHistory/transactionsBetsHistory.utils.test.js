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
        startingBalance: "£0",
        endingBalance: "£0",
        totalDeposits: "£12.40",
        totalWithdrawals: "£55.50",
        totalWagers: "£34.60",
        totalWins: "£34.50",
        totalBonusesConverted: "£2",
      });
    });
  });
});

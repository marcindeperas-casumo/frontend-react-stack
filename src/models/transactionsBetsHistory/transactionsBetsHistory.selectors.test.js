import { transactionsBetsHistoryAnnualOverviewSelector } from "./transactionsBetsHistory.selectors";

describe("Transactions/Bets History Selectors", () => {
  const overview2019 = {
    betsAmount: 123.4,
    winningsAmount: 67.8,
    withdrawalsAmount: 11.3,
    bonusesAmount: 33.2,
    depositsAmount: 19.6,
  };
  const state = {
    schema: {
      transactionsBetsHistory: {
        annualOverview: {
          2019: overview2019,
        },
      },
    },
  };

  describe("transactionsBetsHistoryAnnualOverviewSelector()", () => {
    test("returns year overview if it exists", () => {
      expect(
        transactionsBetsHistoryAnnualOverviewSelector(2019)(state)
      ).toEqual(overview2019);
    });

    test("returns {} if overview for a year does not exist", () => {
      expect(
        transactionsBetsHistoryAnnualOverviewSelector(2010)(state)
      ).toEqual({});
    });
  });
});

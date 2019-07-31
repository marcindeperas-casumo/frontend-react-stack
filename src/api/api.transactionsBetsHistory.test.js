import { DateTime } from "luxon";
import annualOverview from "Models/transactionsBetsHistory/__mocks__/annualOverview.json";
import {
  getWalletTotalsReq,
  getGameroundsTotalsReq,
  getTotalsReq,
  getTransactionsReq,
  getStartingEndBalanceReq,
  getOverviewReq,
  getAnnualOverviewPdfUrlReq,
} from "./api.transactionsBetsHistory";
import {
  transactions,
  walletTotals,
  gameroundTotals,
} from "./__mocks__/api.transactionsBetsHistory.mock";

describe("/api/common/query/wallet/xx-xx-xx-xx-xx/totals", () => {
  const http = {
    get: jest.fn(),
  };

  describe("getWalletTotalsReq()", () => {
    test("is passed correctly formatted url", async () => {
      const props = {
        walletId: "wallet-id-123456",
        startTime: DateTime.local(2018),
        endTime: DateTime.local(2019),
      };
      const startTimeInUrl = encodeURIComponent(props.startTime.toISO());
      const endTimeInUrl = encodeURIComponent(props.endTime.toISO());
      await getWalletTotalsReq(props, http);

      expect(http.get).toHaveBeenCalledWith(
        `/api/common/query/wallet/${props.walletId}/totals?startTime=${startTimeInUrl}&endTime=${endTimeInUrl}`
      );
    });
  });
});

describe("/api/common/query/gamerounds/totals", () => {
  const http = {
    get: jest.fn(),
  };

  describe("getGameroundsTotalsReq()", () => {
    test("is passed correctly formatted url", async () => {
      const props = {
        startTime: DateTime.local(2018),
        endTime: DateTime.local(2019),
      };
      const startTimeInUrl = encodeURIComponent(props.startTime.toMillis());
      const endTimeInUrl = encodeURIComponent(props.endTime.toMillis());
      await getGameroundsTotalsReq(props, http);

      expect(http.get).toHaveBeenCalledWith(
        `/api/common/query/gamerounds/totals?from=${startTimeInUrl}&to=${endTimeInUrl}`
      );
    });
  });
});

describe("getTotalsReq()", () => {
  const currency = "GBP";
  const get = jest
    .fn()
    .mockReturnValueOnce([
      {
        currency,
        awardedBonuses: { amount: 24 },
        convertedBonuses: { amount: 12 },
        withdrawals: { amount: 11 },
        deposits: { amount: 55.7 },
      },
    ])
    .mockReturnValueOnce([
      {
        currency,
        betsAmount: 89.3,
        winningsAmount: 124,
      },
    ]);
  const http = {
    get,
  };
  const props = {
    walletId: "wallet-id-789",
    startTime: DateTime.utc(2017),
    endTime: DateTime.utc(2018),
  };

  test("returns data in expected shape", async () => {
    const data = await getTotalsReq(props, http);

    expect(data).toEqual({
      currency,
      awardedBonusesAmount: 24,
      convertedBonusesAmount: 12,
      withdrawalsAmount: 11,
      depositsAmount: 55.7,
      betsAmount: 89.3,
      winningsAmount: 124,
    });
  });
});

describe("getTransactionsReq()", () => {
  const http = {
    get: jest.fn(),
  };

  test("is called with correctly formatted url", async () => {
    const props = {
      walletId: "wallet-id-123456",
      startTime: DateTime.utc(2018),
      endTime: DateTime.utc(2019),
    };
    const startTimeInUrl = props.startTime.toISO();
    const endTimeInUrl = props.endTime.toISO();
    await getTransactionsReq(props, http);

    expect(http.get).toHaveBeenCalledWith(
      `/api/common/query/wallet/${props.walletId}/transaction/${startTimeInUrl}/${endTimeInUrl}/50`
    );
  });
});

describe("getStartingEndBalanceReq()", () => {
  const http = {
    get: jest.fn().mockReturnValueOnce(transactions),
  };

  test("returns data correctly calculated based on fetched data", async () => {
    const props = {
      walletId: "wallet-id-123456",
      startTime: DateTime.utc(2019),
      endTime: DateTime.utc(2020),
    };

    const resp = await getStartingEndBalanceReq(props, http);

    expect(resp).toEqual({
      startingBalanceAmount: 249.2855,
      endBalanceAmount: 289.2855,
    });
  });
});

describe("getOverviewReq()", () => {
  const startingEndBalances = {
    startingBalanceAmount: 249.2855,
    endBalanceAmount: 289.2855,
  };
  const http = {
    get: jest
      .fn()
      // these are for getTotalsReq
      .mockReturnValueOnce(walletTotals)
      .mockReturnValueOnce(gameroundTotals)
      // this is for getStartingEndBalanceReq
      .mockReturnValueOnce(transactions),
  };

  test("returns data correctly calculated based on fetched data", async () => {
    const props = {
      walletId: "wallet-id-123456",
      startTime: DateTime.utc(2019),
      endTime: DateTime.utc(2020),
    };

    const resp = await getOverviewReq(props, http);

    expect(resp).toEqual({
      ...annualOverview,
      ...startingEndBalances,
    });
  });
});

describe("getAnnualOverviewPdfUrlReq()", () => {
  const post = jest.fn();
  const http = {
    post,
  };
  const props = {
    name: "John Doe",
    dni: "234234-sdfs-34243",
    year: 2000,
    startingBalance: 44,
    endingBalance: 80,
    totalDeposits: 78,
    totalWithdrawals: 66,
    totalWagers: 2,
    totalWins: 45,
    totalBonusesConverted: 23,
  };

  test("should issue post with the props passed to the req body", () => {
    getAnnualOverviewPdfUrlReq(props, http);

    expect(post).toHaveBeenCalledWith(expect.any(String), props);
  });
});

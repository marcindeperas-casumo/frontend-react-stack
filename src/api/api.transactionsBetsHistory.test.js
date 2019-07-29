import { DateTime } from "luxon";
import {
  getWalletTotalsReq,
  getGameroundsTotalsReq,
  getTotalsReq,
  getTransactionsReq,
  getStartingEndBalanceReq,
} from "./api.transactionsBetsHistory";
import { transactions as transactionsMock } from "./__mocks__/api.transactionsBetsHistory.mock";

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
    get: jest.fn().mockReturnValueOnce(transactionsMock),
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

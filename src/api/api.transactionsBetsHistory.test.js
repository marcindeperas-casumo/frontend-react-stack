// @flow
import { DateTime } from "luxon";
import { URLS } from "./api.common";
import {
  getWalletTotalsReq,
  getGameroundsTotalsReq,
  getTotalsReq,
  getTransactionsReq,
  getAnnualOverviewPdfUrlReq,
} from "./api.transactionsBetsHistory";

describe("api.transactionsBetsHistory", () => {
  let http;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      del: jest.fn(),
    };
  });

  describe("/api/common/query/wallet/xx-xx-xx-xx-xx/totals", () => {
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
          `${URLS.QUERY}/wallet/${props.walletId}/totals?startTime=${startTimeInUrl}&endTime=${endTimeInUrl}`
        );
      });
    });
  });

  describe("/api/common/query/gamerounds/totals", () => {
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
          `${URLS.QUERY}/gamerounds/totals?from=${startTimeInUrl}&to=${endTimeInUrl}`
        );
      });
    });
  });

  describe("getTotalsReq()", () => {
    const currency = "GBP";
    const props = {
      walletId: "wallet-id-789",
      startTime: DateTime.utc(2017),
      endTime: DateTime.utc(2018),
    };

    test("returns data in expected shape", async () => {
      const get = jest
        .fn()
        .mockResolvedValueOnce([
          {
            currency,
            awardedBonuses: { amount: 24 },
            convertedBonuses: { amount: 12 },
            withdrawals: { amount: 11 },
            deposits: { amount: 55.7 },
          },
        ])
        .mockResolvedValueOnce(
          Promise.resolve([
            {
              currency,
              betsAmount: 89.3,
              winningsAmount: 124,
            },
          ])
        );

      http = {
        ...http,
        get,
      };

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
        `${URLS.QUERY}/wallet/${props.walletId}/transaction/${startTimeInUrl}/${endTimeInUrl}/50`
      );
    });
  });

  describe("getAnnualOverviewPdfUrlReq()", () => {
    const props = {
      name: "John Doe",
      dni: "234234-sdfs-34243",
      year: 2000,
      startingBalance: "€44",
      endingBalance: "€80",
      totalDeposits: "€78",
      totalWithdrawals: "€66",
      totalWagers: "€2",
      totalWins: "€45",
      totalBonusesConverted: "€23",
    };

    test("should issue post with the props passed to the req body", () => {
      const post = jest.fn();
      http = {
        ...http,
        post,
      };

      getAnnualOverviewPdfUrlReq(props, http);

      expect(post).toHaveBeenCalledWith(expect.any(String), props);
    });
  });
});

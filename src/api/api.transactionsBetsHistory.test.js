// @flow
import { DateTime } from "luxon";
import { URLS } from "./api.common";
import { getTransactionsReq } from "./api.transactionsBetsHistory";

describe("api.transactionsBetsHistory", () => {
  let http;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      del: jest.fn(),
    };
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
});

import { DateTime } from "luxon";
import {
  getWalletTotalsUrl,
  getWalletTotalsReq,
  getGameroundsTotalsUrl,
  getGameroundsTotalsReq,
} from "./api.transactionsBetsHistory";

describe("/api/common/query/wallet/xx-xx-xx-xx-xx/totals", () => {
  const http = {
    get: jest.fn(),
  };

  describe("getWalletTotalsUrl()", () => {
    test("returns correctly built url", () => {
      const playerId = "player-id-1234";
      const startTime = DateTime.local(2018);
      const startTimeInUrl = encodeURIComponent(startTime.toISO());
      const endTime = DateTime.local();
      const endTimeInUrl = encodeURIComponent(endTime.toISO());
      const url = getWalletTotalsUrl({
        playerId,
        startTime,
        endTime,
      });

      expect(url).toEqual(
        `/api/common/query/wallet/${playerId}/totals?startTime=${startTimeInUrl}&endTime=${endTimeInUrl}`
      );
    });
  });

  describe("getWalletTotalsReq()", () => {
    test("is passed correctly formatted url", async () => {
      const props = {
        playerId: "player-id-123456",
        startTime: DateTime.local(2018),
        endTime: DateTime.local(2019),
      };
      const startTimeInUrl = encodeURIComponent(props.startTime.toISO());
      const endTimeInUrl = encodeURIComponent(props.endTime.toISO());
      const data = await getWalletTotalsReq(props, http);

      expect(http.get).toHaveBeenCalledWith(
        `/api/common/query/wallet/${props.playerId}/totals?startTime=${startTimeInUrl}&endTime=${endTimeInUrl}`
      );
    });
  });
});

describe("/api/common/query/gamerounds/totals", () => {
  const http = {
    get: jest.fn(),
  };

  describe("getGameroundsTotalsUrl()", () => {
    test("returns correctly built url", () => {
      const startTime = DateTime.local(2018);
      const startTimeInUrl = encodeURIComponent(startTime.toMillis());
      const endTime = DateTime.local();
      const endTimeInUrl = encodeURIComponent(endTime.toMillis());
      const url = getGameroundsTotalsUrl({
        startTime,
        endTime,
      });

      expect(url).toEqual(
        `/api/common/query/gamerounds/totals?from=${startTimeInUrl}&to=${endTimeInUrl}`
      );
    });
  });

  describe("getGameroundsTotalsReq()", () => {
    test("is passed correctly formatted url", async () => {
      const props = {
        startTime: DateTime.local(2018),
        endTime: DateTime.local(2019),
      };
      const startTimeInUrl = encodeURIComponent(props.startTime.toMillis());
      const endTimeInUrl = encodeURIComponent(props.endTime.toMillis());
      const data = await getGameroundsTotalsReq(props, http);

      expect(http.get).toHaveBeenCalledWith(
        `/api/common/query/gamerounds/totals?from=${startTimeInUrl}&to=${endTimeInUrl}`
      );
    });
  });
});

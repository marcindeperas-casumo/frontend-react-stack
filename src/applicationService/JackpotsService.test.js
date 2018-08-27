import jackpotsClientMock from "../serviceClients/JackpotsClient";
import commonClientMock from "../serviceClients/CommonClient";

import { JackpotsServiceFactory } from "./JackpotsService";

jest.mock("../serviceClients/JackpotsClient");
jest.mock("../serviceClients/CommonClient");

describe("Jackpots service", () => {
  let service;
  const expectedJackpot = [
    {
      gameId: "netent-bingo",
      amount: "1.000,00 €",
    },
    {
      gameId: "playngo-114",
      amount: "1.000,00 €",
    },
  ];
  const handshake = {
    market: "___en",
  };

  const jackpotsResponse = {
    jackpots: [
      {
        games: [],
        jackpotId: "netent-bingo",
        jackpotType: "Local",
        iso4217CurrencyCode: "EUR",
        jackpotAmount: 1000.0,
        formattedJackpotAmount: "1.000,00 €",
        latestPayoutDate: 1535097917328,
        payoutCount: 0,
        totalJackpotAmountPaidOut: 0.0,
        formattedTotalJackpotAmountPaidOut: "0,00 €",
      },
      {
        games: [],
        jackpotId: "playngo-114",
        jackpotType: "Unknown",
        iso4217CurrencyCode: "EUR",
        jackpotAmount: 1000.0,
        formattedJackpotAmount: "1.000,00 €",
        latestPayoutDate: -3600000,
        payoutCount: 0,
        totalJackpotAmountPaidOut: 0.0,
        formattedTotalJackpotAmountPaidOut: "0,00 €",
      },
    ],
  };

  beforeEach(() => {
    service = JackpotsServiceFactory();
    jest.resetAllMocks();
    jackpotsClientMock.jackpots.mockResolvedValue(
      Promise.resolve(jackpotsResponse.jackpots)
    );
    commonClientMock.handshake.mockResolvedValue(Promise.resolve(handshake));
  });

  test("should return the transformed jackpots fetched from the API", async () => {
    expect(await service.jackpots()).toEqual(expectedJackpot);
  });

  test("should cache the API results and return cached value after the first call", async () => {
    const result1 = await service.jackpots();
    const result2 = await service.jackpots();

    expect(jackpotsClientMock.jackpots).toHaveBeenCalledTimes(1);
    expect(result1).toEqual(expectedJackpot);
    expect(result2).toEqual(expectedJackpot);
  });
});

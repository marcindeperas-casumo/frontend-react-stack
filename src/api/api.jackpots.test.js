import { getJackpots, URLS } from "./api.jackpots";

describe("API/jackpots", () => {
  const rawJackpots = [
    {
      formattedJackpotAmount: "10.000,00 €",
      formattedTotalJackpotAmountPaidOut: "0,00 €",
      games: [],
      iso4217CurrencyCode: "EUR",
      jackpotAmount: 10000,
      jackpotId: "playngo-127",
      jackpotType: "Unknown",
      latestPayoutDate: -3600000,
      payoutCount: 0,
      totalJackpotAmountPaidOut: 0,
    },
    {
      formattedJackpotAmount: "50.000,00 €",
      formattedTotalJackpotAmountPaidOut: "0,00 €",
      games: [],
      iso4217CurrencyCode: "EUR",
      jackpotAmount: 10000,
      jackpotId: "playngo-129",
      jackpotType: "Unknown",
      latestPayoutDate: -30000,
      payoutCount: 0,
      totalJackpotAmountPaidOut: 0,
    },
  ];
  const http = {
    get: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ jackpots: rawJackpots })),
  };
  const market = "___en";
  const currencyCode = "EUR";

  describe("getJackpots()", () => {
    test("calls http.get() with the right URL", () => {
      getJackpots({ market, currencyCode }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        `${URLS.JACKPOTS}/${market}/currency/${currencyCode}`
      );
    });

    test("returns the transformed jackpots array", async () => {
      const formattedJackpots = [
        {
          currencyCode: "EUR",
          formattedJackpotAmount: "10.000,00 €",
          gameId: "playngo-127",
        },
        {
          currencyCode: "EUR",
          formattedJackpotAmount: "50.000,00 €",
          gameId: "playngo-129",
        },
      ];

      const jackpots = await getJackpots({ market, currencyCode }, http);

      expect(jackpots).toEqual({ jackpots: formattedJackpots });
    });
  });
});

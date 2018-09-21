import { cacheFunction } from "../lib/utils";
import jackpotsClient from "Clients/JackpotsClient";
import sessionService from "Services/SessionService";

const cachedJackpots = cacheFunction({
  fn: async () => {
    const market = await sessionService.market();
    const currencyCode = await sessionService.currencyCode();
    const { jackpots } = await jackpotsClient.jackpots({
      market,
      currencyCode,
    });
    return jackpots;
  },
});

export const JackpotsServiceFactory = () => ({
  jackpots: () => cachedJackpots(),
});

export default JackpotsServiceFactory();

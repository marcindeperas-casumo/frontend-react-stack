import { cacheFunction } from "../lib/utils";
import jackpotsClient from "../serviceClients/JackpotsClient";
import sessionService from "../applicationService/SessionService";

const cachedJackpots = cacheFunction({
  fn: async () => {
    const market = await sessionService.market();
    const { jackpots } = await jackpotsClient.jackpots(market);
    return jackpots;
  },
});

export const JackpotsServiceFactory = () => ({
  jackpots: () => cachedJackpots(),
});

export default JackpotsServiceFactory();

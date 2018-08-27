import { cacheFunction } from "../utils";
import jackpotsClient from "../serviceClients/JackpotsClient";
import sessionService from "../applicationService/SessionService";

const getJackpots = async () => {
  const market = sessionService.market();
  const { jackpots } = await jackpotsClient.jackpots(market);

  return jackpots.map(jackpot => ({
    gameId: jackpot.jackpotId,
    amount: jackpot.formattedJackpotAmount,
  }));
};

export const JackpotsServiceFactory = () => ({
  jackpots: cacheFunction({ fn: getJackpots }),
});

export default JackpotsServiceFactory();

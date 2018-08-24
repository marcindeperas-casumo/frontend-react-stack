import { cacheFunction } from "../utils";
import jackpotsClient from "../serviceClients/JackpotsClient";

const getJackpots = async () => {
  const jackpots = await jackpotsClient.jackpots();

  return jackpots.map(jackpot => ({
    gameId: jackpot.jackpotId,
    amount: jackpot.formattedJackpotAmount,
  }));
};

export const JackpotsServiceFactory = () => ({
  jackpots: cacheFunction({ fn: getJackpots }),
});

export default JackpotsServiceFactory();

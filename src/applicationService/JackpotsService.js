import { cacheFunction } from "../utils";
import jackpotsClient from "../serviceClients/JackpotsClient";
import sessionService from "../applicationService/SessionService";

const getJackpots = async () => {
  const market = await sessionService.market();
  const { jackpots } = await jackpotsClient.jackpots(market);

  return jackpots.map(jackpot => ({
    gameId: jackpot.jackpotId,
    amount: jackpot.formattedJackpotAmount,
  }));
};

const getJackpotById = async gameId => {
  const jackpots = await getJackpots();
  let gameJackpot = jackpots.find(jackpot => jackpot.gameId === gameId);

  return gameJackpot || null;
};

export const JackpotsServiceFactory = () => ({
  jackpots: cacheFunction({ fn: getJackpots }),
  getJackpotById: cacheFunction({ fn: getJackpotById }),
});

export default JackpotsServiceFactory();

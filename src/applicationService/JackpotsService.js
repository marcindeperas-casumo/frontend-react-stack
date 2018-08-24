import { cacheFunction } from "../utils";
import jackpotsClient from "../serviceClients/JackpotsClient";
import commonClient from "../serviceClients/CommonClient";
import sessionService from "../applicationService/SessionService";
import get from "lodash/get";

const getJackpots = async () => {
  const handshake = await commonClient.handshake();
  const playerId = await sessionService.playerId();
  const market = get(
    handshake,
    `common/composition/players.players[${playerId}].market`
  );
  const jackpots = await jackpotsClient.jackpots(market);

  return jackpots.map(jackpot => ({
    gameId: jackpot.jackpotId,
    amount: jackpot.formattedJackpotAmount,
  }));
};

export const JackpotsServiceFactory = () => ({
  jackpots: cacheFunction({ fn: getJackpots }),
});

export default JackpotsServiceFactory();

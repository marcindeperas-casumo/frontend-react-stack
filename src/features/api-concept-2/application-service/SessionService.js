import { get } from "object-path";
import {
  compose,
  composePromises,
  isNotNullOrUndefined,
  property
} from "../../../utils";
import commonService from "./CommonService";
import countryGuesserService from "./CountryGuesserService";

const fromCommonHandshake = k => property(`common/composition/${k}`);

const pullSession = fromCommonHandshake("session");
const pullPlayers = fromCommonHandshake("players");
const currentPlayerFromHandshake = compose(
  ([session, players]) => players.players[session.id],
  x => [pullSession(x), pullPlayers(x)]
);
const countryFromPlayer = player =>
  get(player, "contactInfo.primaryAddress.country");

export const SessionServiceFactory = ({
  commonService,
  countryGuesserService
}) => {
  const getSession = composePromises(pullSession, commonService.handshake);

  const isAuthenticated = composePromises(isNotNullOrUndefined, getSession);
  const country = async () => {
    if (!(await isAuthenticated())) {
      return countryGuesserService.guess();
    }

    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);
    return countryFromPlayer(currentPlayer);
  };

  return { isAuthenticated, country };
};

export default SessionServiceFactory({
  commonService,
  countryGuesserService
});

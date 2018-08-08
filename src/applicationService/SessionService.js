import {
  compose,
  composePromises,
  isNotNullOrUndefined,
  property,
} from "../utils";
import commonService from "./CommonService";
import countryGuesserService from "./CountryGuesserService";

const fromCommonHandshake = k => property(`common/composition/${k}`);

const pullSession = fromCommonHandshake("session");
const pullPlayers = fromCommonHandshake("players");
const currentPlayerFromHandshake = compose(
  ([session, players]) => players.players[session.id],
  x => [pullSession(x), pullPlayers(x)]
);
const countryFromPlayer = compose(
  property("country"),
  property("primaryAddress"),
  property("contactInfo")
);
const currencyFromPlayerWallet = compose(
  property("iso4217CurrencyCode"),
  property("balance"),
  property("wallet")
);

export const SessionServiceFactory = ({
  commonService,
  countryGuesserService,
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

  const playerId = async () => {
    if (!(await isAuthenticated())) {
      return null;
    }

    return composePromises(property("id"), getSession)();
  };

  const iso4217CurrencyCode = async () => {
    if (!(await isAuthenticated())) return null;
    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return currencyFromPlayerWallet(currentPlayer);
  };

  return { isAuthenticated, country, playerId, iso4217CurrencyCode };
};

export default SessionServiceFactory({
  commonService,
  countryGuesserService,
});

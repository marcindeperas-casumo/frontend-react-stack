import { complement, compose, isNil, prop } from "ramda";

import { composePromises } from "../lib/utils";
import commonService from "./CommonService";
import countryGuesserService from "./CountryGuesserService";

const fromCommonHandshake = k => prop(`common/composition/${k}`);

const pullSession = fromCommonHandshake("session");
const pullPlayers = fromCommonHandshake("players");
const currentPlayerFromHandshake = compose(
  ([session, players]) => players.players[session.id],
  x => [pullSession(x), pullPlayers(x)]
);
const languageFromPlayer = compose(
  prop("language"),
  prop("configuration")
);
const currencyFromPlayer = compose(
  prop("iso4217CurrencyCode"),
  prop("balance"),
  prop("wallet")
);
const countryFromPlayer = compose(
  prop("country"),
  prop("primaryAddress"),
  prop("contactInfo")
);
const currencyFromPlayerWallet = compose(
  prop("iso4217CurrencyCode"),
  prop("balance"),
  prop("wallet")
);

export const SessionServiceFactory = ({
  commonService,
  countryGuesserService,
}) => {
  const getSession = composePromises(pullSession, commonService.handshake);

  const isAuthenticated = composePromises(complement(isNil), getSession);
  const country = async () => {
    if (!(await isAuthenticated())) return countryGuesserService.guess();

    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return countryFromPlayer(currentPlayer);
  };

  const language = async () => {
    if (!(await isAuthenticated())) {
      // This should be refactored as language guesser
      return countryGuesserService.guess();
    }

    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return languageFromPlayer(currentPlayer);
  };

  const market = async () => {
    const defaultMarket = "___en";

    if (!(await isAuthenticated())) return defaultMarket;

    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return currentPlayer.market;
  };

  const currencyCode = async () => {
    const defaultCurrency = "EUR";

    if (!(await isAuthenticated())) return defaultCurrency;

    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return currencyFromPlayer(currentPlayer);
  };

  const playerId = async () => {
    if (!(await isAuthenticated())) return null;
    return composePromises(prop("id"), getSession)();
  };

  const iso4217CurrencyCode = async () => {
    if (!(await isAuthenticated())) return null;
    const handshake = await commonService.handshake();
    const currentPlayer = currentPlayerFromHandshake(handshake);

    return currencyFromPlayerWallet(currentPlayer);
  };

  return {
    isAuthenticated,
    country,
    language,
    playerId,
    market,
    iso4217CurrencyCode,
    currencyCode,
  };
};

export default SessionServiceFactory({
  commonService,
  countryGuesserService,
});

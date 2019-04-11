import { createSelector } from "reselect";
import {
  compose,
  prop,
  pathOr,
  isNil,
  isEmpty,
  complement,
  anyPass,
  propSatisfies,
} from "ramda";
import { INTL_LOCALES, LANGUAGES, MARKETS } from "Src/constants";
import { APP_HANDSHAKE_KEY, GAMES_HANDSHAKE_KEY } from "./handshake.constants";

export const DEFAULT_LANGUAGE = LANGUAGES[MARKETS.___en];

export const handshakeSelector = state => state.handshake;

export const applicationHandshakeSelector = createSelector(
  handshakeSelector,
  prop(APP_HANDSHAKE_KEY)
);

export const isApplicationHandshakeLoaded = createSelector(
  applicationHandshakeSelector,
  complement(anyPass([isNil, isEmpty]))
);

export const session = createSelector(
  applicationHandshakeSelector,
  prop("common/composition/session")
);

export const playersSelector = createSelector(
  applicationHandshakeSelector,
  compose(
    prop("players"),
    prop("common/composition/players")
  )
);

export const isAuthenticated = createSelector(
  session,
  complement(anyPass([isNil, isEmpty]))
);

export const playerIdSelector = createSelector(
  session,
  prop("id")
);

export const playerSelector = createSelector(
  playersSelector,
  playerIdSelector,
  (players, playerId) => prop(playerId)(players)
);

export const sessionIdSelector = createSelector(
  session,
  prop("sessionId")
);

// TODO: check if we need to fallback on the country guesser. Another option
// would be to set the guesser values in the application state, so it will be
// available for everyone
export const countrySelector = createSelector(
  playerSelector,
  compose(
    prop("country"),
    prop("primaryAddress"),
    prop("contactInfo")
  )
);

export const currencySelector = createSelector(
  playerSelector,
  compose(
    prop("iso4217CurrencyCode"),
    prop("balance"),
    prop("wallet")
  )
);

export const marketSelector = createSelector(
  playerSelector,
  prop("market")
);

export const hasMadeFirstDepositSelector = createSelector(
  playerSelector,
  propSatisfies(complement(isNil), "firstDepositDate")
);

export const gamesHandshakeSelector = createSelector(
  handshakeSelector,
  prop(GAMES_HANDSHAKE_KEY)
);

export const isGamesHandshakeLoaded = createSelector(
  gamesHandshakeSelector,
  complement(anyPass([isNil, isEmpty]))
);

export const languageSelector = createSelector(
  marketSelector,
  market => LANGUAGES[market] || DEFAULT_LANGUAGE
);

export const getCmsHash = createSelector(
  languageSelector,
  compose(
    prop("rootContentHashes"),
    prop("common/composition/wpInterface"),
    prop("app"),
    handshakeSelector
  ),
  (lang, rootContentHashes) => {
    return prop(lang)(rootContentHashes);
  }
);

/**
 * Inside player object in handshake we have info about reel races that player
 * opted for. We have to use that to check if ongoing race should be shown and
 * how much spins player have left (on the card).
 */
export const optedInReelRacesSelector = createSelector(
  playerSelector,
  pathOr({}, ["playerTournamentCampaign", "tournaments"])
);

export const localeSelector = createSelector(
  marketSelector,
  market => INTL_LOCALES[market]
);

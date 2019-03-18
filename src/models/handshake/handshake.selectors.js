import { createSelector } from "reselect";
import {
  compose,
  prop,
  isNil,
  isEmpty,
  complement,
  anyPass,
  propSatisfies,
} from "ramda";
import { LANGUAGES, MARKETS } from "Src/constants";
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
export const country = createSelector(
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

export const getLanguage = createSelector(
  marketSelector,
  market => LANGUAGES[market] || DEFAULT_LANGUAGE
);

export const getCmsHash = createSelector(
  getLanguage,
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

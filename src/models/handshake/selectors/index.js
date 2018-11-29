import { createSelector } from "reselect";
import {
  compose,
  prop,
  isNil,
  isEmpty,
  complement,
  anyPass,
  defaultTo,
} from "ramda";
import { APP_HANDSHAKE_KEY, GAMES_HANDSHAKE_KEY } from "Models/handshake";
import { LANGUAGES, MARKETS } from "Src/constants";

export const DEFAULT_LANGUAGE = LANGUAGES[MARKETS.EN];

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
export const players = createSelector(
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
export const playerId = createSelector(session, prop("id"));
export const player = createSelector(players, playerId, (players, playerId) =>
  prop(playerId)(players)
);
// TODO: check if we need to fallback on the country guesser. Another option
// would be to set the guesser values in the application state, so it will be
// available for everyone
export const country = createSelector(
  player,
  compose(
    prop("country"),
    prop("primaryAddress"),
    prop("contactInfo")
  )
);

export const currency = createSelector(
  player,
  compose(
    prop("iso4217CurrencyCode"),
    prop("balance"),
    prop("wallet")
  )
);

export const market = createSelector(player, prop("market"));

export const gamesHandshakeSelector = createSelector(
  handshakeSelector,
  prop(GAMES_HANDSHAKE_KEY)
);

export const isGamesHandshakeLoaded = createSelector(
  gamesHandshakeSelector,
  complement(anyPass([isNil, isEmpty]))
);

export const getLanguage = createSelector(
  market,
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

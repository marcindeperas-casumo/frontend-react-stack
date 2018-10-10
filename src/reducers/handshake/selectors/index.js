import { createSelector } from "reselect";
import { compose, prop, isNil, isEmpty, complement } from "ramda";
import { APP_HANDSHAKE_KEY, GAMES_HANDSHAKE_KEY } from "Reducers/handshake";

export const handshakeSelector = state => state.handshake;

export const applicationHandshakeSelector = createSelector(
  handshakeSelector,
  prop(APP_HANDSHAKE_KEY)
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
export const isAuthenticated = createSelector(session, complement(isNil));
export const playerId = createSelector(session, prop("id"));
export const player = createSelector(
  players,
  playerId,
  (players, playerId) => players[playerId]
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
  complement(isEmpty)
);

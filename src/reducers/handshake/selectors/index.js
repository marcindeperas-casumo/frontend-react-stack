import { createSelector } from "reselect";
import { prop, isNil, complement } from "ramda";

const fromCommonHandshake = k => prop(`common/composition/${k}`);
const pullSession = fromCommonHandshake("session");

export const handshakeSelector = state => state.handshake;
export const session = createSelector(handshakeSelector, handshakeState =>
  pullSession(handshakeState)
);
export const isAuthenticated = createSelector(session, complement(isNil));
export const playerId = createSelector(session, prop("id"));

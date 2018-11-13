import { createSelector } from "reselect";
import { all, identity } from "ramda";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Reducers/handshake/selectors";

export const isGameListLoaded = createSelector(
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
  (...props) => all(identity)([...props])
);

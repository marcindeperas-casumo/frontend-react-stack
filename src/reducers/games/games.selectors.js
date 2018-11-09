import { createSelector } from "reselect";
import { all, identity } from "ramda";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Reducers/handshake/selectors";

export const isEverythingFetchedForGamesLists = createSelector(
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
  (...args) => all(identity)([...args])
);

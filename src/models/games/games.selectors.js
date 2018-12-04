import { createSelector } from "reselect";
import { all, identity } from "ramda";
import { areGameListsLoaded } from "Models/schema";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Models/handshake";

export const isGameListLoaded = createSelector(
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
  areGameListsLoaded,
  (...props) => all(identity)([...props])
);

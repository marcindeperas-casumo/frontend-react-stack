import { createSelector } from "reselect";
import { all, identity } from "ramda";
import { areGameListsLoaded } from "Models/schema/selector";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Models/handshake/selectors";

export const isGameListLoaded = createSelector(
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
  areGameListsLoaded,
  (...props) => all(identity)([...props])
);

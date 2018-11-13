import { createSelector } from "reselect";
import { all, identity } from "ramda";
import { areGameListsLoaded } from "Reducers/schema/selector";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Reducers/handshake/selectors";

export const isGameListLoaded = createSelector(
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
  areGameListsLoaded,
  (...props) => all(identity)([...props])
);

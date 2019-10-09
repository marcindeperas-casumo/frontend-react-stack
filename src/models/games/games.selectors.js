import { createSelector } from "reselect";
import { all, identity, contains } from "ramda";
import { areGameListsLoaded, gameListSelector } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";
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

export const isGameInMyList = id =>
  createSelector(
    gameListSelector(GAME_LIST_IDS.MY_LIST),
    gameList => contains(id, gameList.games)
  );

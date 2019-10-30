import { put, select } from "redux-saga/effects";
import { without } from "ramda";
import { isGameInMyListSelector } from "Models/games";
import { sessionIdSelector } from "Models/handshake";
import {
  ENTITY_KEYS,
  normalizeData,
  updateEntity,
  gameListSelector,
} from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";
import {
  addGameToMyList,
  removeGameFromMyList,
} from "Api/api.casinoPlayerGames";
import logger from "Services/logger";

export function* updateMyListSaga({ gameSlug }) {
  const gameIsInMyList = yield select(isGameInMyListSelector(gameSlug));
  const sessionId = yield select(sessionIdSelector);
  const myList = yield select(gameListSelector(GAME_LIST_IDS.MY_LIST));

  // toggle add / remove game from list.
  if (!gameIsInMyList) {
    addGameToMyList({ sessionId, gameSlug }).catch(error => {
      logger.error("SAGA/updateMyList - adding to list", error);
      removeGameFromEntities(gameSlug, myList);
    });

    yield put(updateEntity(addGameToEntities(gameSlug, myList)));
  } else {
    removeGameFromMyList({ sessionId, gameSlug }).catch(error => {
      logger.error("SAGA/updateMyList - removing from list", error);
      addGameToEntities(gameSlug, myList);
    });

    yield put(updateEntity(removeGameFromEntities(gameSlug, myList)));
  }
}

function removeGameFromEntities(gameSlug, list) {
  const entity = {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.MY_LIST,
      title: list.title,
      games: without(gameSlug, list.games),
    },
  };

  const { entities } = normalizeData(entity);

  return entities;
}

function addGameToEntities(gameSlug, list) {
  const entity = {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.MY_LIST,
      title: list.title,
      games: [gameSlug, ...list.games],
    },
  };

  const { entities } = normalizeData(entity);

  return entities;
}

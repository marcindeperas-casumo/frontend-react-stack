import { put, select } from "redux-saga/effects";
import { without } from "ramda";
import { isGameInMyList, addMyListGame, removeMyListGame } from "Models/games";
import { sessionIdSelector } from "Models/handshake";
import {
  ENTITY_KEYS,
  normalizeData,
  updateEntity,
  gameListSelector,
} from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

export function* updateMyListSaga({ gameSlug }) {
  const gameIsInMyList = yield select(isGameInMyList(gameSlug));
  const sessionId = yield select(sessionIdSelector);
  const myList = yield select(gameListSelector(GAME_LIST_IDS.MY_LIST));

  // toggle add / remove game from list.
  if (!gameIsInMyList) {
    yield put(addMyListGame({ sessionId, gameSlug }));
    const entity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.MY_LIST,
        title: myList.title,
        games: [gameSlug, ...myList.games],
      },
    };

    const { entities } = normalizeData(entity);
    yield put(updateEntity(entities));
  } else {
    yield put(removeMyListGame({ sessionId, gameSlug }));
    const entity = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.MY_LIST,
        title: myList.title,
        games: without(gameSlug, myList.games),
      },
    };

    const { entities } = normalizeData(entity);
    yield put(updateEntity(entities));
  }
}

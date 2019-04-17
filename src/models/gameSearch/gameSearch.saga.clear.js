import { call, put, select, all } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  gameSearchResultsPagesLoaded,
  getgameSearchListIdByPage,
} from "Models/gameSearch";

export function* clearSearchResultsSaga() {
  const pagesLoaded = yield select(gameSearchResultsPagesLoaded);

  const entitiesList = yield all(
    pagesLoaded.map(page =>
      call(normalizeData, {
        [ENTITY_KEYS.GAME_LIST]: {
          id: getgameSearchListIdByPage(page),
          games: [],
        },
      })
    )
  );

  yield all(entitiesList.map(({ entities }) => put(updateEntity(entities))));
}

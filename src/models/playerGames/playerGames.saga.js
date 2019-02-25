import { all, call, put, take, select } from "redux-saga/effects";
import { range, includes } from "ramda";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchPlayerGames,
  isPlayerGamesPageLoaded,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
  playerGamesPagesLoaded,
} from "Models/playerGames";

export function* fetchPlayerGamesPageSaga({ page, pageSize }) {
  yield put(fetchPlayerGames({ page, pageSize }));

  const { response } = yield take(getFetchCompleteTypeByPage(page));

  const gameList = {
    id: getPlayerGamesListIdByPage(page),
    games: response,
  };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = Math.ceil(startIndex / pageSize);
  const pageLoaded = yield select(isPlayerGamesPageLoaded(page));

  if (pageLoaded) {
    return;
  }

  yield call(fetchPlayerGamesPageSaga, { page, pageSize });

  const pagesLoaded = yield select(playerGamesPagesLoaded);

  // if scrolling fast make sure we get all previous pages
  // if they are not in the store
  const previousPagesLoaded = range(0, page).map(i => includes(i, pagesLoaded));

  yield all(
    previousPagesLoaded.map(
      (v, i) => !v && call(fetchPlayerGamesPageSaga, { page: i, pageSize })
    )
  );
}

import { range, includes } from "ramda";
import { all, call, select } from "redux-saga/effects";
import {
  isPlayerGamesPageLoaded,
  playerGamesPagesLoaded,
  fetchPlayerGamesPageSaga,
} from "Models/playerGames";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = Math.ceil(startIndex / pageSize);
  const pageLoaded = yield select(isPlayerGamesPageLoaded(page));

  if (pageLoaded) {
    return;
  }

  yield call(fetchPlayerGamesPageSaga, { page, pageSize });

  // if scrolling fast make sure we get all previous pages
  // if they are not in the store
  const pagesLoaded = yield select(playerGamesPagesLoaded);
  const previousPagesLoaded = yield Promise.resolve(
    range(0, page).map(i => includes(i, pagesLoaded))
  );

  yield all(
    previousPagesLoaded.map(
      (v, i) => !v && call(fetchPlayerGamesPageSaga, { page: i, pageSize })
    )
  );
}

import { select, call, put } from "redux-saga/effects";
import {
  CURATED_SLUG,
  curatedSelector,
  getGamesBySlug,
} from "Reducers/curated";
import { head } from "ramda";
import { country as countrySelector } from "Reducers/handshake/selectors";
import { actions as schemaActions } from "Reducers/schema";
import { normalizeData } from "Reducers/schema/schema";
import { gameSelector } from "Reducers/schema/selector";

export function* fetchCuratedSaga() {
  const response = yield select(curatedSelector(CURATED_SLUG));
  const { game } = response;

  if (game && game.length) {
    const gameData = yield select(gameSelector(head(game)));

    if (!gameData) {
      const platform = "mobile";
      const country = yield select(countrySelector);
      const slugs = [head(game)];
      const variant = "default";
      const response = yield call(getGamesBySlug, {
        platform,
        country,
        slugs,
        variant,
      });
      const { entities } = yield call(normalizeData, response);
      yield put(schemaActions.updateEntity(entities));
    }
  }
}

import { select, put, take, call } from "redux-saga/effects";
import { types, fetchGamesById } from "Models/promotion";
import { country as getCountry } from "Models/handshake/selectors";
import { normalizeData } from "Models/schema/schema";
import { actions as schemaActions } from "Models/schema";

export function* fetchGamesFromIdsSaga(action) {
  const { slugs } = action;

  const platform = "mobile";
  const variant = "default";
  const country = yield select(getCountry);
  yield put(fetchGamesById({ platform, country, slugs, variant }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(types.PROMOTION_FETCH_GAMES_COMPLETE);
  const { entities } = yield call(normalizeData, response);
  yield put(schemaActions.updateEntity(entities));
}

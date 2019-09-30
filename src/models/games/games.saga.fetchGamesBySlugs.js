import { call, put, select, take } from "redux-saga/effects";
import { countrySelector } from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { initiateFetchGamesBySlugs } from "./games.actions";
import { getFetchGamesBySlugsCompleteType } from "./games.utils";

export function* fetchGamesBySlugsSaga({ slugs }) {
  const platform = "mobile";
  const variant = "default";
  const country = yield select(countrySelector);
  yield put(initiateFetchGamesBySlugs({ platform, country, slugs, variant }));

  // pause execution until request is completed, normalize and update the store
  const { response } = yield take(getFetchGamesBySlugsCompleteType(slugs));
  const { entities } = yield call(normalizeData, response);
  yield put(updateEntity(entities));
}

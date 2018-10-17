import { delay } from "redux-saga";
import { call, put, take, select } from "redux-saga/effects";
import { normalizeData } from "Reducers/schema/schema";
import { actions as schemaActions } from "Reducers/schema";
import { getCmsHash, getLanguage } from "Reducers/handshake/selectors";
import { getFetchCompleteTypeBySlug } from "./cms.utils";
import { initiateFetch } from "./cms.actions";
import { shouldFetchPageFactory } from "./cms.selectors";

// TODO: Handle failed fetches and timed out fetches.
export function* fetchPageBySlugSaga(action) {
  // Debounce the fetch requests
  yield call(delay, 0);

  const { slug } = action;
  const completedType = getFetchCompleteTypeBySlug(slug);
  const hash = yield select(getCmsHash);
  const lang = yield select(getLanguage);
  const shouldFetch = yield select(shouldFetchPageFactory(slug));

  // Instantiate a fetch only if the page is not in the store yet.
  // If it is already in the generator finishes - it has nothing to do.
  if (shouldFetch) {
    yield put(initiateFetch({ slug, hash, lang }));

    const { response } = yield take(completedType);
    const { entities } = normalizeData(response);

    yield put(schemaActions.updateEntity(entities));
  }
}

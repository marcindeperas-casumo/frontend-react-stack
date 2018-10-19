import { delay } from "redux-saga";
import { call, put, take, select } from "redux-saga/effects";
import { CMS_ENTITY_KEY, normalizeData } from "Reducers/schema/schema";
import { actions as schemaActions } from "Reducers/schema";
import { getCmsHash, getLanguage } from "Reducers/handshake/selectors";
import {
  getFetchCompleteTypeBySlug,
  initiateFetch,
  shouldFetchPageFactory,
} from "Reducers/cms";

// TODO: Handle failed fetches and timed out fetches.
export function* fetchPageBySlugSaga(action) {
  // As every <CMSField /> component can initate a request to
  // fetch a particular CMS page, there can be a lot of
  // requests for fetching the same page at the same time.
  // The reason is that they will start the fetching before the first
  // saga could update the fetch-info on the store.
  // By putting every fetch-cms-saga to the end of the event loop
  // we can make sure that we only request every CMS page once
  // through the network.
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
    const { entities } = normalizeData(updateSlugInResponse(response, slug));

    yield put(schemaActions.updateEntity(entities));
  }
}

// We would like to extend the original slug with the "base path",
// so we can avoid possible conflicts.
// Example: "mobile.foo-bar" and "games.foo-bar" have the same slugs
// in the CMS object, but we still would like to distinguish them.
function updateSlugInResponse(response, slug) {
  return {
    [CMS_ENTITY_KEY]: {
      ...response[CMS_ENTITY_KEY],
      slug,
    },
  };
}

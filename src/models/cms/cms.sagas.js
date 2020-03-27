import { delay } from "redux-saga";
import { call, put, take, select } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { getCmsHash, languageSelector } from "Models/handshake";
import {
  getFetchCompleteTypeBySlug,
  initiateFetch,
  shouldFetchPage,
} from "Models/cms";
import { getChildrenAndParent, setSlug } from "./cms.utils";

// TODO: Handle failed fetches and timed out fetches.
export function* fetchPageBySlugSaga(action) {
  // This is to make sure that we only request every CMS page once
  // we can make sure that we only request every CMS page once through the network.
  yield call(delay, 0);

  const { slug } = action;
  if (!slug) {
    return;
  }
  const shouldFetch = yield select(shouldFetchPage(slug));

  // Instantiate a fetch only if the page is not in the store yet.
  // If it is already in the generator finishes - it has nothing to do.
  if (shouldFetch) {
    const completedActionType = getFetchCompleteTypeBySlug(slug);
    const hash = yield select(getCmsHash);
    const lang = yield select(languageSelector);

    yield put(initiateFetch({ slug, hash, lang }));

    const { response } = yield take(completedActionType);

    // We would like to extend the original slug with the "base path",
    // so we can avoid possible conflicts.
    // Example: "mobile.foo-bar" and "games.foo-bar" have the same slugs
    // in the CMS object, but we still would like to distinguish them.
    const page = setSlug(response, slug);

    const hasChildren = response.children && response.children.length > 0;
    const entityKey = hasChildren ? `${ENTITY_KEYS.CMS}s` : ENTITY_KEYS.CMS;
    const entity = hasChildren
      ? { [entityKey]: getChildrenAndParent(page) }
      : { [entityKey]: page };
    const { entities } = normalizeData(entity);

    yield put(updateEntity(entities));
  }
}

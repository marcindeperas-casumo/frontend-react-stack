// @flow
import { put, all, take } from "redux-saga/effects";
import { reduce, map, path, mergeDeepRight } from "ramda";
import { fetchPageBySlug, getFetchCompleteTypeBySlug } from "Models/cms";
import { removeScriptTags } from "./cmsConfig.utils";
import { METHOD_CONFIG_PATH } from "./methodConfig.constants";
import { setPaymentMethodConfig } from "./methodConfig.actions";

export function* methodConfigSaga(action: any, state: any): * {
  const configSlugs = METHOD_CONFIG_PATH[action.methodType];

  yield all(configSlugs.map(slug => put(fetchPageBySlug(slug))));

  const pages = yield all(
    configSlugs.map(slug => take(getFetchCompleteTypeBySlug(slug)))
  );

  const config = reduce(
    mergeDeepRight,
    {},
    map(
      page =>
        JSON.parse(removeScriptTags(path(["response", "content"])(page) || "")),
      pages
    )
  );

  yield put(setPaymentMethodConfig(action.methodType, config));
}

// @flow
import { put, all, select, take } from "redux-saga/effects";
import { reduce, map, prop, mergeDeepRight } from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { removeScriptTag } from "./cmsConfig.utils";
import { METHOD_CONFIG_PATH } from "./methodConfig.constants";
import { setPaymentMethodConfig } from "./methodConfig.actions";

export function* methodConfigSaga(action: any, state: any): * {
  const configSlugs = METHOD_CONFIG_PATH[action.methodType];

  yield all(configSlugs.map(slug => put(fetchPageBySlug(slug))));
  yield all(configSlugs.map(slug => take("SCHEMA/UPDATE_ENTITY"))); //WHAAAT?

  const pages = yield all(configSlugs.map(slug => select(getPage(slug))));

  const config = reduce(
    mergeDeepRight,
    {},
    map(e => JSON.parse(removeScriptTag(prop("content")(e) || "")), pages)
  );

  yield put(setPaymentMethodConfig(action.methodType, config));
}

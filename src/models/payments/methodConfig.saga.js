// @flow
import { put, all, take } from "redux-saga/effects";
import { reduce, map, path, mergeDeepRight } from "ramda";
import { fetchPageBySlug, getFetchCompleteTypeBySlug } from "Models/cms";
import { parseCmsPaymentConfig } from "./cmsConfig.utils";
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
      page => parseCmsPaymentConfig(path(["response", "content"])(page)),
      pages
    )
  );

  const specificMethodPage = pages[configSlugs.length - 1].response;

  const specificMethodConfig = {
    image: specificMethodPage.fields?.image,
  };

  yield put(
    setPaymentMethodConfig(action.methodType, {
      ...config,
      ...specificMethodConfig,
    })
  );
}
